import * as React from 'react'
import Panel from './panel'
import FabricCanvas from './fabricCanvas'



export default class Whiteboard extends React.Component {

    public render() {
        return (
        <div id = "whiteBoardComponent">
          <div id = "panel"><Panel channelId={this.props.channelId} /></div>
          <div id = "fabricCanvas"><FabricCanvas channelId={this.props.channelId}/></div>
        </div>

        )
    }
}
