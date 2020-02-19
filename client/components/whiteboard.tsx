import * as React from 'react'
import Panel from './panel'
import FabricCanvas from './fabricCanvas'
import {WhiteboardProps} from '../types/componentTypes'

const Whiteboard: React.SFC<WhiteboardProps> = (props) => {
  return (
    <div id = "whiteBoardComponent">
      <div id = "panel"><Panel channelId={props.channelId} /></div>
      <div id = "fabricCanvas"><FabricCanvas channelId={props.channelId}/></div>
    </div>
  )
}

export default Whiteboard
