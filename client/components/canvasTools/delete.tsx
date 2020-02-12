import { fabric } from 'fabric'
import {PathCommand} from '../fabricCanvas'
import clientSocket from '../../sockets/chat-sockets'

export function removeObject(
    canvas: any,
    channelId: string
) {
    let activeObject = canvas.getActiveObject()
    if (activeObject) {
    let deleteCommand = {
      id: activeObject.uid,
      path: activeObject
    }
    canvas.remove(activeObject)
    clientSocket.emit('delete-object-from-client', channelId, deleteCommand)
}
}
