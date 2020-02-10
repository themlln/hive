import * as React from 'react'
import {updateTool} from '../store/Panel'
import { connect } from 'react-redux'
import { fabric } from 'fabric'
import { clientSocket } from './home'
import { Socket } from 'net'

class Panel extends React.Component<PanelStateProps & PanelDispatchProps> {

  constructor(props) {
    super(props)
    this.clearCanvas = this.clearCanvas.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.generateId = this.generateId.bind(this)
    this.addText = this.addText.bind(this)
  }
  componentDidMount() {
  }

 async clearCanvas(action: string) {
    await this.props.canvasRef.clear()
    this.props.canvasRef.backgroundColor = 'white'
    clientSocket.emit('clear-canvas', this.props.channelId)
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
    clientSocket.emit('draw-from-client', this.props.channelId, textCommand)
    this.props.canvasRef.add(newText)
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
          clientSocket.emit('delete-object-from-client', this.props.channelId, deleteCommand)
          }
          } >Delete
        </button>
        <button type="button" onClick={() => this.handleClick('select')}>Select/Move</button>
        <button type="button" onClick={() => {
          this.handleClick('text')
          this.addText()
          }}>Text</button>

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
  canvasRef: any,
  channelId: String
}

interface PanelDispatchProps {
  updateTool: (tool: string) => {tool: string}
}
const mapStateToProps = (state: any, ownProps: {channelId: String}): PanelStateProps => {
  return {
    tool: state.panel.tool,
    canvasRef: state.panel.canvasRef,
    channelId: ownProps.channelId
  }
}

const mapDispatchToProps = (dispatch: any ): PanelDispatchProps => {
  return {
    updateTool: (tool: string) => dispatch(updateTool(tool))
  }
}

const connectPanel = connect(mapStateToProps, mapDispatchToProps)(Panel)

export default connectPanel
