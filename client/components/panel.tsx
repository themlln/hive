import * as React from 'react'
import {updateTool} from '../store/Panel'
import { connect } from 'react-redux'
import { fabric } from 'fabric'
import { clientSocket } from './fabricCanvas'
import { Socket } from 'net'
import { addText } from './canvasTools/text'
import { addCircle } from './canvasTools/circle'
import { addRectangle } from './canvasTools/rectangle'
import { addTriangle } from './canvasTools/triangle'
import { removeObject } from './canvasTools/delete'
export const channelId: String = '/canvas'

class Panel extends React.Component<PanelStateProps & PanelDispatchProps> {

  constructor(props) {
    super(props) 
    this.clearCanvas = this.clearCanvas.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
  }

 async clearCanvas(action: string) {
    await this.props.canvasRef.clear()
    this.props.canvasRef.backgroundColor = 'white'
    clientSocket.emit('clear-canvas', channelId)
 }
 async handleClick(action: string) {
   await this.props.updateTool(action)
  }
  

  render() {
    return(
      <div>
        <button type="button" onClick={() => this.handleClick('draw')}>Pen
        </button>

        <button type="button" onClick={() => {
          this.handleClick('delete')
          removeObject(this.props.canvasRef)
          }>Delete
        </button>
        <button type="button" onClick={() => this.handleClick('select')}>Select/Move</button>
        
        <button type="button" onClick={() => {
          this.handleClick('text')
          addText(this.props.color, this.props.canvasRef)
          }}>Text</button>

        <button type="button" onClick={() => {
          this.handleClick('line')
          }}>Line</button>

        <button type="button" onClick={() => {
          this.handleClick('circle')
          addCircle(this.props.color, this.props.canvasRef)
          }}>Circle</button>

        <button type="button" onClick={() => {
          this.handleClick('rectangle')
          addRectangle(this.props.color, this.props.canvasRef)
          }}>Rectangle</button>

        <button type="button" onClick={() => {
          this.handleClick('triangle')
          addTriangle(this.props.color, this.props.canvasRef)
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
