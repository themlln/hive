import * as React from 'react'
import Panel from './panel'
import FabricCanvas from './fabricCanvas'



export default class Whiteboard extends React.Component {

    public render() {
        console.log("WHITE BOARD PROPS***", this.props);
        return (

        <div>
          <Panel channelId={this.props.channelId} />
          <FabricCanvas channelId={this.props.channelId}/>
        </div>

        )
    }
}
