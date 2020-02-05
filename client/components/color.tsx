import * as React from 'react'
import { CompactPicker } from 'react-color'
import { connect } from 'react-redux'
import { updateColor } from '../store/Panel'


class ColorPicker extends React.Component<ColorStateProps & ColorDispatchProps> {

  handleChangeComplete = (color: any) => {
  this.props.updateColor(color.hex)
  }

  render() {
    return (
    <div>
    <CompactPicker color={this.props.color}
    onChangeComplete={this.handleChangeComplete}/>
    </div>
    )

  }
}

//INTERFACE
interface ColorStateProps {
  state: any
  color: string
}

interface ColorDispatchProps {
  updateColor: (color: string) => {color: string}
}

const mapStateToProps = (state: any): ColorStateProps => {
  return {
    state: state.panel,
    color: state.panel.color
  }
}

const mapDispatchToProps = (dispatch: any): ColorDispatchProps => {
  return {
    updateColor: (color: string) => dispatch(updateColor(color))
  }
}

const connectColorPicker = connect(mapStateToProps, mapDispatchToProps)(ColorPicker)

export default connectColorPicker
