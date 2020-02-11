import * as React from 'react'
import Panel from './panel'
import FabricCanvas from './fabricCanvas'
import ColorPicker from './color'

interface State {
  active: boolean;
}

export class Whiteboard extends React.Component < {}, State > {
    constructor(props) {
      super(props)
      this.state = {
        active: false,
      }

      this.handleToggle = this.handleToggle.bind(this)

    }

    componentDidMount() {

    }

    async handleToggle() {
      this.setState({
        active: !this.state.active
      })
    }

    public render() {
        console.log("WHITE BOARD PROPS***", this.props);
        return (

        <div>
          <Panel channelId={this.props.channelId} />
          {this.state.active && <ColorPicker />}
          <button type="button" onClick={this.handleToggle}>
            Color Picker
          </button>
          <FabricCanvas channelId={this.props.channelId}/>
        </div>

        )
    }
}
