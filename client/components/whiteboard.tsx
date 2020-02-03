import * as React from 'react'
// import {draw, canvas, position, resize} from '../whiteboard-utilities'
import {draw} from '../whiteboard-utilities'
import { findDOMNode } from 'react-dom'


let currentMousePosition: any = {x: 0, y: 0}
let lastMousePosition: any = {x: 0, y: 0}

interface State {
  // canvas: HTMLCanvasElement
  canvasRef: any
}

export class Whiteboard extends React.Component <{}, State> {
  constructor(props) {
    super(props)

    // this.canvasRef = React.createRef();

    this.state = {
      canvasRef: React.createRef()
    }

    this.setup = this.setup.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    // this.handleResize = this.handleResize.bind(this)
  }

  // handleResize() {
  //   resize()
  // }

  handleMouseDown(event) {
    // currentMousePosition = position(event)
    console.log('in mouse down');
  }

  handleMouseMove(event) {
    console.log('in mouse move');
    // if (!event.buttons) return
    // lastMousePosition = currentMousePosition
    // currentMousePosition = position(event)
    // lastMousePosition && currentMousePosition && draw(lastMousePosition, currentMousePosition, 'black', true)
  }

  setup() {
    // const canvasRef = this.refs.canvas;
    // const canvasRef = document.getElementsByTagName('canvas')[0];
    // this.setState({
    //   canvas: canvasRef
    // });
    // document.body.appendChild(canvas)
    // canvas.setAttribute('ref', 'canvas');
    // canvas.addEventListener('onMouseDown', this.handleMouseDown);
    // canvas.addEventListener('onMouseMove', this.handleMouseMove);

    // this.handleResize()
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
