import { fabric } from 'fabric'
import { clientSocket, channelId, PathCommand} from '../fabricCanvas'
import {generateId} from './id'

export function addText(
    color: string, 
    canvas: any
) {
    const newText = new fabric.IText('Insert Text Here', {
      fontFamily: 'arial',
      left: 100,
      top: 100 ,
      fill: color
    })
    newText["uid"] = generateId(newText)
    let textCommand = {
      id: newText["uid"],
      textObject: newText
    }
    clientSocket.emit('draw-from-client', channelId, textCommand)
    canvas.add(newText)
}

export function copyText(
    textCommand: any,
    canvas: any
) {
    const newText = new fabric.IText(textCommand.textObject.text, {
        fontFamily: textCommand.textObject.fontFamily,
        left: textCommand.textObject.left,
        top: textCommand.textObject.top,
        fill: textCommand.textObject.fill
      })
      newText["uid"] = textCommand.id
      canvas.add(newText)
}