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
    console.log(event)
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

          const newText = new fabric.IText(instruction.textObject.text, {
            fontFamily: instruction.textObject.fontFamily,
            left: instruction.textObject.left,
            top: instruction.textObject.top,
            fill: instruction.textObject.fill
          })
          newText["uid"] = instruction.id
          this.props.canvasRef.add(newText)
        } else if (instruction.circleObject) {

          const newCircle = new fabric.Circle({
            radius: instruction.circleObject.radius,
            left: instruction.circleObject.left,
            top: instruction.circleObject.top, 
            fill: instruction.circleObject.fill, 
            scaleX: instruction.circleObject.scaleX,
            scaleY: instruction.circleObject.scaleY
          });
          newCircle["uid"] = instruction.id
          this.props.canvasRef.add(newCircle)
        } else if (instruction.rectangleObject) {

          let rect = instruction.rectangleObject
          const newRectangle = new fabric.Rect({
            left: rect.left,
            top: rect.top,
            fill: rect.fill,
            width: rect.width,
            height: rect.height, 
            scaleX: rect.scaleX,
            scaleY: rect.scaleY
          })
          newRectangle["uid"] = instruction.id
          this.props.canvasRef.add(newRectangle)
        } else if (instruction.triangleObject) {

          const triangle = instruction.triangleObject
          const newTriangle = new fabric.Triangle({
            left: triangle.left, 
            top: triangle.top,
            width: triangle.width, 
            height: triangle.height,
            fill: triangle.fill,
            scaleX: triangle.scaleX,
            scaleY: triangle.scaleY
          })
      
          newTriangle["uid"] = instruction.id
          this.props.canvasRef.add(newTriangle)
        } else if (instruction.lineObject) {
          drawLine(instruction, this.props.canvasRef)
        } else if (instruction.path) {
          drawPath(instruction, this.props.canvasRef)
        } 
      })
    })

    clientSocket.on('draw-from-server', (pathCommand: any) => {
      drawPath(pathCommand, this.props.canvasRef)
    })

    clientSocket.on('modified-from-server', (modifiedCommand: any) => {
      const allObjects = this.props.canvasRef.getObjects()
      const objectToModify = allObjects.filter(object => object.uid === modifiedCommand.id)
      const modifiedObject = modifiedCommand.modifiedObject
      // this might be causing the select bug in multiuser experience
  
      if(objectToModify[0].text) {
        objectToModify[0].text = modifiedObject.text
      }

      objectToModify[0].width = modifiedObject.width
      objectToModify[0].height = modifiedObject.height,
      objectToModify[0].left = modifiedObject.left,
      objectToModify[0].top = modifiedObject.top,
      objectToModify[0].scaleX = modifiedObject.scaleX,
      objectToModify[0].scaleY = modifiedObject.scaleY,
      objectToModify[0].translateX =  modifiedObject.translateX,
      objectToModify[0].translateY = modifiedObject.translateY

      this.props.canvasRef.requestRenderAll()
    })

    clientSocket.on('text-from-server', (textCommand) => {
      const newText = new fabric.IText(textCommand.textObject.text, {
        fontFamily: textCommand.textObject.fontFamily,
        left: textCommand.textObject.left,
        top: textCommand.textObject.top,
        fill: textCommand.textObject.fill
      })
      newText["uid"] = textCommand.id
      this.props.canvasRef.add(newText)
    })

    clientSocket.on('circle-from-server', (circleCommand) => {
      const newCircle = new fabric.Circle({
        radius: circleCommand.circleObject.radius,
        left: circleCommand.circleObject.left,
        top: circleCommand.circleObject.top, 
        fill: circleCommand.circleObject.fill
      });
      newCircle["uid"] = circleCommand.id
      this.props.canvasRef.add(newCircle)
    })

    clientSocket.on('rectangle-from-server', (rectangleCommand) => {
      const newRectangle = new fabric.Rect({
        left: rectangleCommand.rectangleObject.left,
        top: rectangleCommand.rectangleObject.top,
        fill: rectangleCommand.rectangleObject.fill,
        width: rectangleCommand.rectangleObject.width,
        height: rectangleCommand.rectangleObject.height
      })
      newRectangle["uid"] = rectangleCommand.id
      this.props.canvasRef.add(newRectangle)
    })

    clientSocket.on('triangle-from-server', (triangleCommand) => {
      const triangle = triangleCommand.triangleObject
      const newTriangle = new fabric.Triangle({
        left: triangle.left, 
        top: triangle.top,
        width: triangle.width, 
        height: triangle.height,
        fill: triangle.fill
      })
  
      newTriangle["uid"] = triangleCommand.id
      this.props.canvasRef.add(newTriangle)
    })

    clientSocket.on('line-from-server', (lineCommand)=> {
      drawLine(lineCommand)
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
