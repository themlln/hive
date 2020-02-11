import { fabric } from 'fabric'
import { clientSocket, channelId, PathCommand} from '../fabricCanvas'
import {generateId} from './id'

export function removeObject(
    canvas: any
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