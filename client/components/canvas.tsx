import * as React from 'react'
import {clientSocket, drawingName} from '../client-socket'

let currentMousePosition: any = {x: 0, y: 0}
let lastMousePosition: any = {x: 0, y: 0}

interface State {
  // canvas: HTMLCanvasElement
  canvasRef: any, 
  instructions: Array<any>
}

export class Canvas extends React.Component <{}, State> {
  constructor(props) {
    super(props)

    this.state = {
      canvasRef: React.createRef(), 
      instructions: []
    }

    // clientSocket.on('load', (strokes: any) => {
    //   console.log('componentDidMount LoAd')
    //   console.log('strokes', strokes)
    //   strokes.forEach((stroke: any) => {
    //     const { start, end, color } = stroke
    //     this.draw(start, end, color, false)
    //     console.log(stroke, "stroke")
    //   })
    // })
    
    // clientSocket.on('draw', (start: any, end: any, color: string) => {
    //   this.draw(start, end, color, false)
    // })
    
    // clientSocket.on('draw', (start: any, end: any, color: string) => {
    //   clientSocket.emit('draw', start, end, color)
    // })


    clientSocket.on('replay-drawing', (instructions: any) => {
      console.log("INSTRUCTIONS RECEIVED!!!!", instructions)
      this.setState({instructions: instructions})
      // instructions.forEach((instruction: any) => this.draw(...instruction, false))
    })

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.load = this.load.bind(this)
    this.draw = this.draw.bind(this)
  }

  draw (
    start: any = [0,0],
    end: any = [0,0],
    strokeColor: string = 'black',
    shouldBroadcast: boolean = true,
  ) {
    
    const ctx: any = this.state.canvasRef.current.getContext('2d')


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
    lastMousePosition && currentMousePosition && this.draw(lastMousePosition, currentMousePosition, 'black', true)
  }

  load() {
    console.log('is load running?')
    console.log('load instructions', this.state.instructions)
    this.state.instructions.forEach((instruction: any) => this.draw(...instruction, false))
  }

  componentDidMount() {
    this.handleResize()
    console.log('Is componentDidMount even running?')
    this.load()

    clientSocket.on('draw-from-server', (start: [number, number], end: [number, number], color: string) => {
      this.draw(start, end, color, false);
    })
  }

  public render() {


    return (
      <>
        <button onClick={ () => this.draw([1,1], [100,100], 'black', true)}>Draw a Line!</button>
        <canvas
          ref={this.state.canvasRef}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
        />
      </>
    )
  }
}
