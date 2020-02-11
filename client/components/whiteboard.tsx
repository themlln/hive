import * as React from 'react'
import Panel from './panel'
import FabricCanvas from './fabricCanvas'
import ColorPicker from './color'
interface State {

}

export default class Whiteboard extends React.Component < {}, {} > {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    public render() {
        console.log("WHITE BOARD PROPS***", this.props);
        return (

        <div>
          <Panel channelId={this.props.channelId}/>
          <ColorPicker />
          <FabricCanvas channelId={this.props.channelId}/>
        </div>

        )
    }
}
