import * as React from 'react'
import {updateTool} from '../store/Panel'
import { connect } from 'react-redux'
import { fabric } from 'fabric'
import { clientSocket } from './fabricCanvas'
import { Socket } from 'net'
export const drawingName: String = '/canvas'

class Panel extends React.Component<PanelStateProps & PanelDispatchProps> {

  constructor(props) {
    super(props)
    this.clearCanvas = this.clearCanvas.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.generateId = this.generateId.bind(this)
    this.addText = this.addText.bind(this)
    this.addCircle = this.addCircle.bind(this)
    this.addRectangle = this.addRectangle.bind(this)
    this.addTriangle = this.addTriangle.bind(this)
    this.addLine = this.addLine.bind(this)
  }
  componentDidMount() {
  }

 async clearCanvas(action: string) {
    await this.props.canvasRef.clear()
    this.props.canvasRef.backgroundColor = 'white'
    clientSocket.emit('clear-canvas', drawingName)
 }
 async handleClick(action: string) {
   await this.props.updateTool(action)

  }

  generateId (object: any) {
    let randomNumber = Math.floor(Math.random()* 1000)
    let idArray = [randomNumber, object.left, object.top, object.width, object.height]
    let idString = idArray.join("").split(".").join("")
    return idString
  }

  addText() {
    const newText = new fabric.IText('Insert Text Here', {
      fontFamily: 'arial',
      left: 100,
      top: 100 ,
    })
    newText["uid"] = this.generateId(newText)
    let textCommand = {
      id: newText["uid"],
      textObject: newText
    }
    clientSocket.emit('draw-from-client', drawingName, textCommand)
    this.props.canvasRef.add(newText)
  }

  addLine() {
    const newLine = new fabric.Line([50, 100, 100, 100], {
      fill: this.props.color, 
      stroke: this.props.color, 
      strokeWidth: 3, 
      selectable: true
    })
    this.props.canvasRef.add(newLine)
  }

  addCircle() {
    const newCircle = new fabric.Circle({
      radius: 15,
      left: 100,
      top: 100, 
      fill: this.props.color
    });
    newCircle["uid"] = this.generateId(newCircle)
    let circleCommand = {
      id: newCircle["uid"],
      circleObject: newCircle
    }
    clientSocket.emit('draw-from-client', drawingName, circleCommand)
    this.props.canvasRef.add(newCircle)
  }

  addRectangle() {
    const newRectangle = new fabric.Rect({
      left: 100,
      top: 100,
      fill: this.props.color,
      width: 20,
      height: 20
    })
    newRectangle["uid"] = this.generateId(newRectangle)
    let rectangleCommand = {
      id: newRectangle["uid"],
      rectangleObject: newRectangle
    }
    clientSocket.emit('draw-from-client', drawingName, rectangleCommand)
    this.props.canvasRef.add(newRectangle)
  }

  addTriangle() {
    const newTriangle = new fabric.Triangle({
      left: 50, 
      top: 50,
      width: 30, 
      height: 30,
      fill: this.props.color
    })

    newTriangle["uid"] = this.generateId(newTriangle) 
    let triangleCommand = {
      id: newTriangle["uid"],
      triangleObject: newTriangle
    }

    clientSocket.emit('draw-from-client', drawingName, triangleCommand)
    this.props.canvasRef.add(newTriangle)
  }

  render() {
    return(
      <div>
        <button type="button" onClick={() => this.handleClick('draw')}>Pen
        </button>

        <button type="button" onClick={() => {
          this.handleClick('delete')
          let activeObject = this.props.canvasRef.getActiveObject()
          let deleteCommand = {
            id: activeObject.uid,
            path: activeObject
          }
          this.props.canvasRef.remove(activeObject)
          clientSocket.emit('delete-object-from-client', drawingName, deleteCommand)
          }
          } >Delete
        </button>
        <button type="button" onClick={() => this.handleClick('select')}>Select/Move</button>
        
        <button type="button" onClick={() => {
          this.handleClick('text')
          this.addText()
          }}>Text</button>

        <button type="button" onClick={() => {
          this.handleClick('line')
          }}>Line</button>

        <button type="button" onClick={() => {
          this.handleClick('circle')
          this.addCircle()
          }}>Circle</button>

        <button type="button" onClick={() => {
          this.handleClick('rectangle')
          this.addRectangle()
          }}>Rectangle</button>

        <button type="button" onClick={() => {
          this.handleClick('triangle')
          this.addTriangle()
          }}>Triangle</button>


        <button type="button" onClick={() => this.clearCanvas('clearCanvas')}>Clear Canvas</button>

        <button type="button" onClick={ () => {
          const dataURL = this.props.canvasRef.toDataURL({
            format: 'jpeg'
          })
          const a = document.createElement('a');
          a.href = `${dataURL}`;
          a.download = "canvas.png";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}>Download Canvas</button>

      </div>
    )
  }
}

//INTERFACE
interface PanelStateProps {
  tool: string
  canvasRef: any
  color: string
}

interface PanelDispatchProps {
  updateTool: (tool: string) => {tool: string}
}
const mapStateToProps = (state: any): PanelStateProps => {
  return {
    tool: state.panel.tool,
    canvasRef: state.panel.canvasRef, 
    color: state.panel.color
  }
}

const mapDispatchToProps = (dispatch: any ): PanelDispatchProps => {
  return {
    updateTool: (tool: string) => dispatch(updateTool(tool))
  }
}

const connectPanel = connect(mapStateToProps, mapDispatchToProps)(Panel)

export default connectPanel
