import { fabric } from 'fabric'
import {PathCommand} from '../fabricCanvas'
import {generateId} from './id'
import clientSocket from '../../sockets/chat-sockets'
import { updateStrokeWidth } from '../../store/panel-store'

export function addText(
    stroke: string,
    fill: string,
    canvas: any,
    channelId: string
) {
    const newText = new fabric.IText('Insert Text Here', {
      fontFamily: 'arial',
      left: 100,
      top: 100 ,
      stroke: stroke,
      fill: fill
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
        fill: textCommand.textObject.fill,
        stroke: textCommand.textObject.stroke,
        flipX: textCommand.textObject.flipX,
        flipY: textCommand.textObject.flipY
      })
      newText["uid"] = textCommand.id
      canvas.add(newText)
}
