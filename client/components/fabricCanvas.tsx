import * as React from 'react'

import * as createClientSocket from 'socket.io-client'
import { connect } from 'react-redux'
export const clientSocket: any = createClientSocket(window.location.origin)
export const drawingName: String = '/canvas'

import { fabric } from 'fabric'
import { Socket } from 'net'

let currentMousePosition: any = {x: 0, y: 0}
let lastMousePosition: any = {x: 0, y: 0}

clientSocket.on('connect', () => {
  console.log('Client-Socket: I have a made a persistent two-way connection!')
  clientSocket.emit('join-drawing', drawingName)
})

interface State {
  canvas: any,
  canvasRef: any,
  instructions: Array<any>
}

class Canvas extends React.Component <CanvasStateProps & CanvasDispatchProps, State> {
  constructor(props) {
    super(props)

    this.state = {
      canvas: {},
      canvasRef: React.createRef(),
      instructions: []
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    // this.handleResize = this.handleResize.bind(this)
    this.drawErase = this.drawErase.bind(this)
  }

  drawErase (
    strokeColor: string = 'black',
    shouldBroadcast: boolean = true,
  ) {
    const canvas = this.state.canvas

    if(this.props.tool === 'erase'){
      strokeColor = 'white'
      canvas.freeDrawingBrush.width = 10;
    }

    canvas.freeDrawingBrush.color = strokeColor
    canvas.isDrawingMode = true
    console.log(canvas, "THIS IS THE CANVASSS")
    if (canvas._objects.length){
      const indexlastObject = canvas._objects.length - 1
      const paths = canvas._objects[indexlastObject].path
      paths.forEach(path =>
        shouldBroadcast && clientSocket.emit('draw-from-client', drawingName, JSON.stringify(path.join(' '))))
    }


      // const canvasStr = JSON.stringify(key)
      // shouldBroadcast && clientSocket.emit('draw-from-client', drawingName, canvasStr)



}

  handleMouseDown(event) {
    console.log("MOUSE DOWNNNNN")
    // currentMousePosition = this.position(event.e)
  }

  handleMouseMove(event) {
    this.drawErase(this.props.color, true)

  }

  componentDidMount() {

  const fabricCanvas = new fabric.Canvas(this.state.canvasRef.current, {
    selection: false,
    preserveObjectStacking: true,
    width: 1000,
    height: 500
  })

  console.log(fabricCanvas, "FABRIC CANVAS")
  this.setState({
    canvas: fabricCanvas
  })
    clientSocket.on('replay-drawing', (instructions) => {
      instructions.forEach(instruction => this.state.canvas.loadFromJSON(instruction, this.state.canvas.renderAll.bind(this.state.canvas)))
    })

    clientSocket.on('draw-from-server', (path) => {
      // this.state.canvas.clear()
      let newPath = new fabric.Path(path)
      this.state.canvas.add(newPath)

      console.log('CANVAS STRINGGGG', path)
      // this.drawErase(color, false);
    })



    //bindings

    fabricCanvas.on('mouse:down', this.handleMouseDown)
    fabricCanvas.on('mouse:move', this.handleMouseMove)

  }

  componentDidUpdate(){
  }

  public render() {
    return (
      <>
        <button onClick={ () => this.drawErase([1,1], [100,100], 'black', true)}>Draw a Line!</button>

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
