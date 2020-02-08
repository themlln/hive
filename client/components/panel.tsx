import * as React from 'react'
import {updateTool} from '../store/Panel'
import { connect } from 'react-redux'
import { fabric } from 'fabric'
import { clientSocket } from './fabricCanvas'
export const drawingName: String = '/canvas'

class Panel extends React.Component<PanelStateProps & PanelDispatchProps> {

  componentDidMount() {
    console.log(this.props, "******PROPS*******")
  }

 async clearCanvas(action: string) {
    await this.props.canvasRef.clear()
    console.log('CANVAS CLEARED')

    clientSocket.emit('clear-canvas', drawingName)
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
          this.props.canvasRef.remove(this.props.canvasRef.getActiveObject())
          }
          } >Delete
        </button>
        <button type="button" onClick={() => this.handleClick('select')}>Select/Move</button>
        <button type="button" onClick={() => {
          this.handleClick('text')
          this.props.canvasRef.add(new fabric.IText('Insert Text Here', {
            fontFamily: 'arial',
            left: 100,
            top: 100 ,
          }))
          }}>Text</button>

        <button type="button" onClick={() => this.clearCanvas('clearCanvas')}>Clear Canvas</button>

      </div>
    )
  }
}

//INTERFACE
interface PanelStateProps {
  tool: string
  canvasRef: any
}

interface PanelDispatchProps {
  updateTool: (tool: string) => {tool: string}
}
const mapStateToProps = (state: any): PanelStateProps => {
  return {
    tool: state.panel.tool,
    canvasRef: state.panel.canvasRef
  }
}

const mapDispatchToProps = (dispatch: any ): PanelDispatchProps => {
  return {
    updateTool: (tool: string) => dispatch(updateTool(tool))
  }
}

const connectPanel = connect(mapStateToProps, mapDispatchToProps)(Panel)

export default connectPanel
