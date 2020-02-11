import * as React from 'react'

import * as createClientSocket from 'socket.io-client'
import { connect } from 'react-redux'
import {updateCanvas} from '../store/Panel'
import { fabric } from 'fabric'
import { Path, Object } from 'fabric/fabric-impl'
import { object } from 'prop-types'
import { Socket } from 'net'
import { draw, sendDrawing, drawPath} from './canvasTools/draw'
import {line, drawLine} from './canvasTools/line'
import {generateId} from './canvasTools/id'
import { copyText } from './canvasTools/text'
import { drawCircle } from './canvasTools/circle'
import { drawRectangle } from './canvasTools/rectangle'
import { drawTriangle } from './canvasTools/triangle'
import { modifyObject } from './canvasTools/modifyObject'

export const clientSocket: any = createClientSocket(window.location.origin)
export const channelId: String = '/canvas'

let currentMousePosition: any = {x: 0, y: 0}
let lastMousePosition: any = {x: 0, y: 0}
let firstMousePosition: any = {x: 0, y: 0}

clientSocket.on('connect', () => {
  console.log('Client-Socket: I have a made a persistent two-way connection!')
  clientSocket.emit('join-drawing', channelId)
})

interface State {
  canvas: any,
  canvasRef: any,
  instructions: Array<any>,
  shouldBroadcast: boolean,
  isSelected: boolean,
  currentObject: any,
  objectHashMap: any
}

export interface PathCommand {
  id: string,
  path: any
}

class Canvas extends React.Component <CanvasStateProps & CanvasDispatchProps, State> {
  constructor(props) {
    super(props)

    this.state = {
      canvas: {},
      canvasRef: React.createRef(),
      instructions: [],
      shouldBroadcast: false,
      isSelected: false,
      currentObject: {},
      objectHashMap: {}
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleObjectModified = this.handleObjectModified.bind(this)
    this.handleObjectSelected = this.handleObjectSelected.bind(this)
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
    firstMousePosition = this.position(event.e)
  }


  handleMouseUp(event) {
    if (this.props.tool === 'draw'){
      sendDrawing(this.props.canvasRef, this.state.shouldBroadcast, this.state.isSelected)
      
      this.setState({
        shouldBroadcast: false,
        currentObject:{}
      })
        
    } else if (this.props.tool === "line") {
      let currentMousePosition = this.position(event.e)
      line (firstMousePosition, currentMousePosition,this.props.color, this.props.color, this.props.strokeWidth, this.props.canvasRef)
    }
  }

  handleMouseMove(event) {
    if(this.props.tool === 'draw'){
      lastMousePosition = currentMousePosition
      currentMousePosition = this.position(event.e)
      lastMousePosition && currentMousePosition && draw(lastMousePosition, currentMousePosition,this.props.strokeWidth, this.props.color, this.props.canvasRef)
      this.setState({ isSelected: false })
    } else {
      this.props.canvasRef.isDrawingMode = false
    }

  }

  handleObjectSelected(event) {
    this.setState({
      isSelected: true
    })
  }

  handleObjectModified(event) {
    const modifiedObject = event.target
    modifiedObject.selectable = true
    const modifiedCommand = {
      id: modifiedObject.uid,
      modifiedObject: modifiedObject
    }

    clientSocket.emit('modified-from-client', channelId, modifiedCommand)
  }

  async componentDidMount() {

    const fabricCanvas = new fabric.Canvas(this.state.canvasRef.current, {
      selection: false,
      preserveObjectStacking: false,
      backgroundColor: 'white'
    })
    fabricCanvas.setHeight(500)
    fabricCanvas.setWidth(1000)

    await this.setState({
      canvas: fabricCanvas
    })

    await this.props.setCanvas(this.state.canvas)


    clientSocket.on('replay-drawing', (instructions) => {
      instructions.forEach(instruction => {
        if(instruction.textObject) {
          copyText(instruction, this.props.canvasRef)
        } else if (instruction.circleObject) {
          drawCircle(instruction, this.props.canvasRef)
        } else if (instruction.rectangleObject) {
          drawRectangle(instruction, this.props.canvasRef)
        } else if (instruction.triangleObject) {
          drawTriangle(instruction, this.props.canvasRef)
        } else if (instruction.lineObject) {
          drawLine(instruction, this.props.canvasRef)
        } else if (instruction.path) {
          drawPath(instruction, this.props.canvasRef)
        } 
      })
    })

    clientSocket.on('modified-from-server', (modifiedCommand: any) => {
      modifyObject(this.props.canvasRef, modifiedCommand)
    })

    clientSocket.on('draw-from-server', (pathCommand: any) => {
      drawPath(pathCommand, this.props.canvasRef)
    })

    clientSocket.on('text-from-server', (textCommand) => {
      copyText(textCommand, this.props.canvasRef)
    })

    clientSocket.on('circle-from-server', (circleCommand) => {
      drawCircle(circleCommand, this.props.canvasRef)
    })

    clientSocket.on('rectangle-from-server', (rectangleCommand) => {
      drawRectangle(rectangleCommand, this.props.canvasRef)
    })

    clientSocket.on('triangle-from-server', (triangleCommand) => {
      drawTriangle(triangleCommand, this.props.canvasRef)
    })

    clientSocket.on('line-from-server', (lineCommand)=> {
      drawLine(lineCommand, this.props.canvasRef)
    }) 

    clientSocket.on('delete-object-from-server', (deleteCommand) => {
      const allObjects = this.props.canvasRef.getObjects()
      const objectToDelete = allObjects.filter(object => object.uid === deleteCommand.id)
      this.props.canvasRef.remove(objectToDelete[0])
    })

    clientSocket.on('clear-canvas', () => {
      this.props.canvasRef.clear()
      this.props.canvasRef.backgroundColor = 'white'
    })

    //bindings
    fabricCanvas.on('mouse:down', this.handleMouseDown)
    fabricCanvas.on('mouse:move', this.handleMouseMove)
    fabricCanvas.on('mouse:up', this.handleMouseUp)
    fabricCanvas.on('object:selected', this.handleObjectSelected)
    fabricCanvas.on('object:modified', this.handleObjectModified)

  }

  componentDidUpdate(){
  }

  public render() {
    return (
      <>
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
  setCanvas: (canvas: any) => {canvas: any}
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
    setCanvas: (canvas) => dispatch(updateCanvas(canvas))
  }
}

const connectCanvas = connect(mapStateToProps, mapDispatchToProps)(Canvas)

export default connectCanvas
