import * as React from 'react'
import {draw, resize, position} from '../whiteboard-utilities'


let currentMousePosition: any = {x: 0, y: 0}
let lastMousePosition: any = {x: 0, y: 0}

interface State {
  // canvas: HTMLCanvasElement
  canvasRef: any
}

export class Whiteboard extends React.Component <{}, State> {
  constructor(props) {
    super(props)

    this.state = {
      canvasRef: React.createRef()
    }

    this.setup = this.setup.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  handleResize() {
    resize(this.state.canvasRef.current)
  }

  handleMouseDown(event) {
    currentMousePosition = position(event, this.state.canvasRef.current)
  }

  handleMouseMove(event) {
    if (!event.buttons) return
    lastMousePosition = currentMousePosition
    currentMousePosition = position(event, this.state.canvasRef.current)
    lastMousePosition && currentMousePosition && draw(lastMousePosition, currentMousePosition, 'black', true, this.state.canvasRef.current)
  }

  setup() {
    this.handleResize()
  }

  componentDidMount() {
    this.setup()
  }

  public render() {
    return (
      <>
        <button onClick={ () => draw([1,1], [100,100], 'black', true, this.state.canvasRef.current)}>Draw a Line!</button>
        <canvas
          ref={this.state.canvasRef}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
        />
      </>
    )
  }
}
