import * as React from 'react'
import {updateTool} from '../store/Panel'
import { connect } from 'react-redux'
import { fabric } from 'fabric'
import { clientSocket } from './home'
import {removeObject} from '../components/canvasTools/delete'
import {addText} from '../components/canvasTools/text'
import {addCircle} from '../components/canvasTools/circle'
import {addRectangle} from '../components/canvasTools/rectangle'
import {addTriangle} from '../components/canvasTools/triangle'
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
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';



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

  render() {
    return(
      <div>
        <span className = "button-wrapper" onClick={() => this.handleClick('draw')}><DrawButton /></span>
        
        <span className = "button-wrapper" onClick={() => {
          this.handleClick('delete')
          removeObject(this.props.canvasRef)
          }}> <DeleteButton />
        </span>

        <span className = "button-wrapper" onClick={() => this.handleClick('select')}><SelectButton /> </span>

        <span className = "button-wrapper" onClick={() => {
          this.handleClick('text')
          addText(this.props.color, this.props.fill, this.props.canvasRef)
          }}><TextButton /></span>

          {this.state.active && <ColorPicker />}
          <span type="button" onClick={this.handleToggle}>
            <ColorButton/>
          </span>

        <span className = "button-wrapper" onClick={() => {
          this.handleClick('line')
          }}><LineButton /></span>

        <span className = "button-wrapper" onClick={() => {
          this.handleClick('circle')
          addCircle(this.props.color, this.props.fill, this.props.canvasRef)
          }}><CircleButton /></span>

        <span className = "button-wrapper" onClick={() => {
          this.handleClick('rectangle')
          addRectangle(this.props.color, this.props.fill, this.props.canvasRef)
          }}><RectangleButton /></span>

        <span className = "button-wrapper" onClick={() => {
          this.handleClick('triangle')
          addTriangle(this.props.color, this.props.fill, this.props.canvasRef)
          }}><TriangleButton /></span>

        <span className = "button-wrapper" onClick={() => this.clearCanvas('clearCanvas')}><ClearCanvasButton /></span>

        <span className = "button-wrapper" onClick={ () => {
          const dataURL = this.props.canvasRef.toDataURL({
            format: 'jpeg'
          })
          const a = document.createElement('a');
          a.href = `${dataURL}`;
          a.download = "canvas.png";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}><DownloadButton /></span>

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
