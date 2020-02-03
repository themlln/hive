import * as React from 'react'
import {draw, canvas, position, resize} from '../whiteboard-utilities'
import { findDOMNode } from 'react-dom'


let currentMousePosition: any = {x: 0, y: 0}
let lastMousePosition: any = {x: 0, y: 0}

export class Whiteboard extends React.Component {
  constructor() {
    super()
    this.canvas = document.createElement('canvas')

    this.setup = this.setup.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  handleResize() {
    resize()
  }
  handleMouseDown(event) {
    currentMousePosition = position(event)
  }

  handleMouseMove(event) {
    if (!event.buttons) return
    lastMousePosition = currentMousePosition
    currentMousePosition = position(event)
    lastMousePosition && currentMousePosition && draw(lastMousePosition, currentMousePosition, 'black', true)
  }

  setup() {
    document.body.appendChild(canvas)
    this.handleResize()
  }

  componentDidMount() {
    this.setup()
    // this.canvas = findDOMNode(this.canvasRef);
    // this.ctx = this.canvas.getContext('2d');
  }

  public render() {
    return (
      <>
        {/* {onMouseDown={(event) => this.handleMouseDown(event)} onMouseMove={(event) => this.handleMouseMove(event)} */}
        <button onClick={ () => draw([1,1], [100,100], 'black', true)}>Draw a Line!</button>
        <canvas 
          ref={(canvas) => this.canvasRef = canvas}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
        />
      </>
    )
  }
}
