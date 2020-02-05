import * as React from 'react'

import * as createClientSocket from 'socket.io-client'
import { connect } from 'react-redux'
export const clientSocket: any = createClientSocket(window.location.origin)
export const drawingName: String = '/canvas'


let currentMousePosition: any = {x: 0, y: 0}
let lastMousePosition: any = {x: 0, y: 0}

clientSocket.on('connect', () => {
  console.log('Client-Socket: I have a made a persistent two-way connection!')
  clientSocket.emit('join-drawing', drawingName)
})

interface State {
  canvasRef: any,
  instructions: Array<any>
}

class Canvas extends React.Component <CanvasStateProps & CanvasDispatchProps, State> {
  constructor(props) {
    super(props)

    this.state = {
      canvasRef: React.createRef(),
      instructions: []
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.drawErase = this.drawErase.bind(this)
  }

  drawErase (
    start: any = [0,0],
    end: any = [0,0],
    strokeColor: string = 'black',
    shouldBroadcast: boolean = true,
  ) {
    const ctx: any = this.state.canvasRef.current.getContext('2d')
    if(this.props.tool === 'erase') {
      strokeColor = 'white'
      ctx.lineWidth = 10
    } else {
      ctx.lineWidth = this.props.strokeWidth
    }
    ctx.beginPath()
    ctx.strokeStyle = strokeColor
    ctx.moveTo(start[0], start[1])
    ctx.lineTo(end[0], end[1])
    ctx.closePath()
    ctx.stroke()

    shouldBroadcast && clientSocket.emit('draw-from-client', drawingName, start, end, strokeColor)
}

  handleResize() {
    const canvas: any = this.state.canvasRef.current
    const ctx: any = canvas.getContext('2d')
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    const pixelRatio: number = window.devicePixelRatio || 1

    const w: number = canvas.clientWidth * pixelRatio
    const h: number = canvas.clientHeight * pixelRatio

    if (w !== canvas.width || h !== canvas.height) {
      const imgData: object = ctx.getImageData(0, 0, canvas.width, canvas.height)

      canvas.width = w
      canvas.height = h

      ctx.putImageData(imgData, 0, 0)
    }
    ctx.scale(pixelRatio, pixelRatio)

    ctx.lineWidth = 5
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
  }

  position(event) {
    return [
      event.pageX - this.state.canvasRef.current.offsetLeft,
      event.pageY - this.state.canvasRef.current.offsetTop
    ]
  }

  handleMouseDown(event) {
    currentMousePosition = this.position(event)
  }

  handleMouseMove(event) {
    if (!event.buttons) return
    lastMousePosition = currentMousePosition
    currentMousePosition = this.position(event)
    lastMousePosition && currentMousePosition && this.drawErase(lastMousePosition, currentMousePosition, 'black', true)
  }

  componentDidMount() {
    this.handleResize()

    clientSocket.on('replay-drawing', (instructions: any) => {
      this.setState({instructions: instructions})
      instructions.forEach((instruction: any) => this.drawErase(...instruction, false))
    })
    clientSocket.on('draw-from-server', (start: [number, number], end: [number, number], color: string) => {
      this.drawErase(start, end, color, false);
    })
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
