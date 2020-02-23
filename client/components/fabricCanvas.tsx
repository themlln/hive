import * as React from 'react'
import { connect } from 'react-redux'
import {updateCanvas} from '../store/panel-store'
import { fabric } from 'fabric'
import { draw, sendDrawing, drawPath} from './canvasTools/draw'
import {line, drawLine} from './canvasTools/line'
import {generateId} from './canvasTools/id'
import { copyText } from './canvasTools/text'
import { drawCircle } from './canvasTools/circle'
import { drawRectangle } from './canvasTools/rectangle'
import { drawTriangle } from './canvasTools/triangle'
import { modifyObject } from './canvasTools/modifyObject'
import clientSocket from '../sockets/chat-sockets'
import { removeObject } from './canvasTools/delete'

let currentMousePosition: any = {x: 0, y: 0}
let lastMousePosition: any = {x: 0, y: 0}
let firstMousePosition: any = {x: 0, y: 0}

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
      sendDrawing(this.props.canvasRef, this.state.shouldBroadcast, this.state.isSelected, this.props.channelId)

      this.setState({
        shouldBroadcast: false,
        currentObject:{}
      })

    } else if (this.props.tool === "line") {
      let currentMousePosition = this.position(event.e)
      line (firstMousePosition, currentMousePosition,this.props.color, this.props.color, this.props.strokeWidth, this.props.canvasRef, this.props.channelId)
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
    clientSocket.emit('modified-from-client', this.props.channelId, modifiedCommand)
  }

  async componentDidMount() {

    const fabricCanvas = new fabric.Canvas(this.state.canvasRef.current, {
      selection: false,
      preserveObjectStacking: false,
      backgroundColor: 'white'
    })
    fabricCanvas.setHeight(450)
    fabricCanvas.setWidth(900)

    await this.setState({
      canvas: fabricCanvas
    })

    await this.props.setCanvas(this.state.canvas)

    let canvas = this.props.canvasRef
    let tool = this.props.tool
    let channelId = this.props.channelId

    document.addEventListener('keydown', function(event){
      if (event.keyCode === 8 || event.keyCode === 46){
        if(canvas.getActiveObject()){
          if (!canvas.getActiveObject().text)
          removeObject(canvas, channelId)
        }
      }
    })

    clientSocket.on('replay-drawing', (instructions) => {

      instructions.forEach(instruction => {
        if(instruction.textObject) {
          console.log('instruction', instruction)
          console.log(instruction.textObject)
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
          id = "canvasRender"
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
    channelId: string
}

interface CanvasDispatchProps {
  setCanvas: (canvas: any) => {canvas: any}
}


const mapStateToProps = (state: any, ownProps: any): CanvasStateProps => {
  return {
    tool: state.panel.tool,
    color: state.panel.color,
    strokeWidth: state.panel.strokeWidth,
    canvasRef: state.panel.canvasRef,
    instructions: state.panel.instruction,
    channelId: ownProps.channelId
  }
}

const mapDispatchToProps = (dispatch: any): CanvasDispatchProps => {
  return {
    setCanvas: (canvas) => dispatch(updateCanvas(canvas))
  }
}

const connectCanvas = connect(mapStateToProps, mapDispatchToProps)(Canvas)

export default connectCanvas
