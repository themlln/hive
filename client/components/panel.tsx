import * as React from 'react'
import {updateTool} from '../store/panel-store'
import { connect } from 'react-redux'
import { fabric } from 'fabric'
import clientSocket from '../sockets/chat-sockets'
import {removeObject} from '../components/canvasTools/delete'
import {addText} from '../components/canvasTools/text'
import {addCircle} from '../components/canvasTools/circle'
import {addRectangle} from '../components/canvasTools/rectangle'
import {addTriangle} from '../components/canvasTools/triangle'
import Clipboard from 'react-clipboard.js'
//buttons - change to one line**
import DeleteButton from './buttons/deleteButton'
import DrawButton from './buttons/drawButton'
import SelectButton from './buttons/selectButton'
import TextButton from './buttons/textButton'
import LineButton from './buttons/lineButton'
import CircleButton from './buttons/circleButton'
import RectangleButton from './buttons/rectangleButton'
import TriangleButton from './buttons/triangleButton'
import DownloadButton from './buttons/downloadButton'
import ClearCanvasButton from './buttons/clearCanvasButton'
import ColorButton from './buttons/colorButton'
import ColorPicker from './color'



interface State {
  active: boolean;
}

class Panel extends React.Component<PanelStateProps & PanelDispatchProps, State> {

  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }

    this.clearCanvas = this.clearCanvas.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.getText = this.getText.bind(this)
  }

  componentDidMount() {
  }

  async handleToggle() {
    this.setState({
      active: !this.state.active
    })
  }

 async clearCanvas(action: string) {
    await this.props.canvasRef.clear()
    this.props.canvasRef.backgroundColor = 'white'
    clientSocket.emit('clear-canvas', this.props.channelId)
 }

 async handleClick(action: string) {
   await this.props.updateTool(action)
  }

  onSuccess(event) {
    event.trigger.textContent='Copied!'
    window.setTimeout(function() {
      event.trigger.textContent='Get Room Key'
    }, 2000)
  }
  getText() {
    return `${this.props.channelId}`
  }

  render() {
    return(
      <div id="allPanels">
      <Clipboard className='clipboard' option-text={this.getText} onSuccess={this.onSuccess} title="Copy sharable room key" onClick= {() => this.handleClick('copy')}>
      Get Room Key
    </Clipboard>
      <div id = "panelButtons">
        <span className = {this.props.tool === 'draw' ? "button-wrapper": ''} title="Pen Tool: Move your cursor to draw or write." onClick={
          () => this.handleClick('draw')
          }><DrawButton /></span>

        <span className = {this.props.tool === 'delete' ? "button-wrapper": ''}  title="Delete Tool: To Delete, select the item you want to delete and then press the delete key on your keyboard." onClick={() => {
          this.handleClick('delete')
          removeObject(this.props.canvasRef, this.props.channelId)
          }}> <DeleteButton />
        </span>

        <span className = {this.props.tool === 'select' ? "button-wrapper": ''} title="Select Tool: Select the element you would like to manipulate/move." onClick={() => this.handleClick('select')}><SelectButton /> </span>

        <span className = {this.props.tool === 'text' ? "button-wrapper": ''} title="Text Tool: Insert text box." onClick={() => {
          this.handleClick('text')
          addText(this.props.color, this.props.fill, this.props.canvasRef, this.props.channelId)
          }}><TextButton /></span>

          {this.state.active && <ColorPicker />}
          <span className = {this.props.tool === 'colorPicker' ? "button-wrapper": ''} onClick={() => {
            this.handleToggle()
            this.handleClick('colorPicker')}}>
            <ColorButton/>
          </span>

        {/* <span className = {this.props.tool === 'line' ? "button-wrapper": ''} title="Line Tool: Draw linear vectors." onClick={() => {
          this.handleClick('line')
          }}><LineButton /></span> */}

        <span className = {this.props.tool === 'circle' ? "button-wrapper": ''} title="Circle Tool: Create and manipulate a circle object." onClick={() => {
          this.handleClick('circle')
          addCircle(this.props.color, this.props.fill, this.props.canvasRef, this.props.channelId)
          }}><CircleButton /></span>

        <span className = {this.props.tool === 'rectangle' ? "button-wrapper": ''} title="Rectangle Tool: Create and manipulate a rectangle object." onClick={() => {
          this.handleClick('rectangle')
          addRectangle(this.props.color, this.props.fill, this.props.canvasRef, this.props.channelId)
          }}><RectangleButton /></span>

        <span className = {this.props.tool === 'triangle' ? "button-wrapper": ''} title="Triangle Tool: Create and manipulate a triangle object." onClick={() => {
          this.handleClick('triangle')
          addTriangle(this.props.color, this.props.fill, this.props.canvasRef, this.props.channelId)
          }}><TriangleButton /></span>

        <span className = {this.props.tool === 'clear' ? "button-wrapper": ''} title="Clear Canvas" onClick={() => {
          this.clearCanvas('clearCanvas')
          this.handleClick('clear')
        }}><ClearCanvasButton /></span>

        <span className = {this.props.tool === 'download' ? "button-wrapper": ''} title="Download Canvas: Download Canvas as an image."  onClick={ () => {
          const dataURL = this.props.canvasRef.toDataURL({
            format: 'jpeg'
          })
          const a = document.createElement('a');
          a.href = `${dataURL}`;
          a.download = "canvas.png";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          this.handleClick('download')
        }}><DownloadButton /></span>

      </div>
    </div>
    )
  }
}

//INTERFACE
interface PanelStateProps {
  tool: string
  canvasRef: any
  channelId: string
  color: string,
  fill: string
}

interface PanelDispatchProps {
  updateTool: (tool: string) => {tool: string}
}
const mapStateToProps = (state: any, ownProps: {channelId: string}): PanelStateProps => {
  return {
    tool: state.panel.tool,
    canvasRef: state.panel.canvasRef,
    channelId: ownProps.channelId,
    color: state.panel.color,
    fill: state.panel.fill
  }
}

const mapDispatchToProps = (dispatch: any ): PanelDispatchProps => {
  return {
    updateTool: (tool: string) => dispatch(updateTool(tool))
  }
}

const connectPanel = connect(mapStateToProps, mapDispatchToProps)(Panel)

export default connectPanel
