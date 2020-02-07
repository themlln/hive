import * as React from 'react'

import * as createClientSocket from 'socket.io-client'
import { connect } from 'react-redux'
export const clientSocket: any = createClientSocket(window.location.origin)
export const drawingName: String = '/canvas'


import { fabric } from 'fabric'

let currentMousePosition: any = {x: 0, y: 0}
let lastMousePosition: any = {x: 0, y: 0}

clientSocket.on('connect', () => {
  console.log('Client-Socket: I have a made a persistent two-way connection!')
  clientSocket.emit('join-drawing', drawingName)
})

interface State {
  canvas: any,
  canvasRef: any,
  instructions: Array<any>,
  shouldBroadcast: boolean
}

class Canvas extends React.Component <CanvasStateProps & CanvasDispatchProps, State> {
  constructor(props) {
    super(props)

    this.state = {
      canvas: {},
      canvasRef: React.createRef(),
      instructions: [],
      shouldBroadcast: false
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.drawErase = this.drawErase.bind(this)
  }


  drawErase (
    start: any = [0,0],
    end: any = [0,0],
    strokeColor: string = 'black',
    strokeWidth: number = 3
  ) {
    const canvas = this.state.canvas
    if(this.props.tool === 'erase'){
      strokeColor = 'white'
      strokeWidth = 20;
    }

    canvas.freeDrawingBrush.width = strokeWidth
    canvas.freeDrawingBrush.color = strokeColor
    canvas.isDrawingMode = true
    this.state.shouldBroadcast && clientSocket.emit('draw-from-client', drawingName, start, end, strokeColor, strokeWidth)
    }

  position(event) {
    return [
      event.pageX,
      event.pageY - 270
    ]
  }

  handleMouseDown(event) {
    this.setState({
      shouldBroadcast: true
    })
    currentMousePosition = this.position(event.e)
  }


  handleMouseUp(event) {
    this.setState({
      shouldBroadcast: false
    })
  }

  handleMouseMove(event) {
    if(this.props.tool === 'draw' || this.props.tool === 'erase'){
      lastMousePosition = currentMousePosition
      currentMousePosition = this.position(event.e)
      lastMousePosition && currentMousePosition && this.drawErase(lastMousePosition, currentMousePosition, this.props.color, this.props.strokeWidth)
    } else {
      this.state.canvas.isDrawingMode = false
    }

  }

  handleObjectSelected(event) {

  }

  componentDidMount() {

  const fabricCanvas = new fabric.Canvas(this.state.canvasRef.current, {
    selection: false,
    preserveObjectStacking: true,
  })
  fabricCanvas.setHeight(500)
  fabricCanvas.setWidth(1000)

  this.setState({
    canvas: fabricCanvas
  })

    clientSocket.on('replay-drawing', (instructions) => {
      instructions.forEach(instruction => {
        const newPath = new fabric.Path(instruction[0])
        newPath.set({stroke: instruction[1], strokeWidth: instruction[2]})
        this.state.canvas.add(newPath)
      })
    })

    clientSocket.on('draw-from-server', (line: string, color: string, width: number) => {
      // this.state.canvas.add(new fabric.Line([...start,...end], {
      //   stroke: color,
      //   strokeWidth: width
      // }))
      const newPath = new fabric.Path(line)
      newPath.set({stroke: color, strokeWidth: width})
      this.state.canvas.add(newPath)
    })



    //bindings

    fabricCanvas.on('mouse:down', this.handleMouseDown)
    fabricCanvas.on('mouse:move', this.handleMouseMove)
    fabricCanvas.on('mouse:up', this.handleMouseUp)
    fabricCanvas.on('object:selected', this.handleObjectSelected)

  }

  componentDidUpdate(){
  }

  public render() {
    return (
      <>
        <button type="button" onClick={ () => {
          const path = new fabric.Path('M 1 1 L 200 200')
          path.set({stroke: 'pink',
        strokeWidth: 10})
          this.state.canvas.add(path)
        }}>TESTINGG</button>

        <button type="button" onClick={ () => {
          const text = new fabric.IText('Tap and Type', {
            fontFamily: 'Times New Roman',
            left: 100,
            top: 100 ,
          })
          text.on('selected', function() {
            console.log('selected text!')
          })
          this.state.canvas.add(text)

        }}>Add Text Box</button>





        <canvas
          ref={this.state.canvasRef}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
        />
      </>
    )
  }
}

//INTERFACE

interface CanvasStateProps {
    tool: string
    color: string
    strokeWidth: number
    canvasRef: any
    instructions: Array<any>
}

interface CanvasDispatchProps {

}


const mapStateToProps = (state: any): CanvasStateProps => {
  return {
    tool: state.panel.tool,
    color: state.panel.color,
    strokeWidth: state.panel.strokeWidth,
    canvasRef: state.panel.canvasRef,
    instructions: state.panel.instruction,
  }
}

const mapDispatchToProps = (dispatch: any): CanvasDispatchProps => {
  return {
  }
}

const connectCanvas = connect(mapStateToProps, mapDispatchToProps)(Canvas)

export default connectCanvas
