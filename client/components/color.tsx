import * as React from 'react'
import { CompactPicker } from 'react-color'
import { connect } from 'react-redux'
import { updateColor, updateFill } from '../store/Panel'


class ColorPicker extends React.Component<ColorStateProps & ColorDispatchProps> {

  handleChangeComplete = (color: any) => {
  this.props.updateColor(color.hex)
  }

  handleFillChange = (color: any) => {
    this.props.updateFill(color.hex)

  }

  render() {
    return (
    <div id="colorPickers">
      <div id="strokeColor">
      <h5>Stroke Color</h5>
      <CompactPicker color={this.props.color}
      onChangeComplete={this.handleChangeComplete}/>
      </div>

      <div id="fillColor">
      <h5>Fill Color</h5>
      <CompactPicker color={this.props.fill}
      onChangeComplete={this.handleFillChange}/>
      </div>
    </div>
    )

  }
}

//INTERFACE
interface ColorStateProps {
  state: any
  color: string
  fill: string
}

interface ColorDispatchProps {
  updateColor: (color: string) => {color: string}
  updateFill: (fill: string) => {fill: string}
}

const mapStateToProps = (state: any): ColorStateProps => {
  return {
    state: state.panel,
    color: state.panel.color,
    fill: state.panel.fill
  }
}

const mapDispatchToProps = (dispatch: any): ColorDispatchProps => {
  return {
    updateColor: (color: string) => dispatch(updateColor(color)),
    updateFill: (fill: string) => dispatch(updateFill(fill))
  }
}

const connectColorPicker = connect(mapStateToProps, mapDispatchToProps)(ColorPicker)

export default connectColorPicker
