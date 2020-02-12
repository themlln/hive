import { fabric } from 'fabric'
import {PathCommand} from '../fabricCanvas'
import {generateId} from './id'
import clientSocket from '../../sockets/chat-sockets'
import { updateStrokeWidth } from '../../store/Panel'
import { resolveTxt } from 'dns'

export function addRectangle(
    stroke: string,
    fill: string,
    canvas: any,
    channelId: string
) {
    const newRectangle = new fabric.Rect({
      left: 100,
      top: 100,
      stroke: stroke,
      fill: fill,
      width: 20,
      height: 20
    })
    newRectangle["uid"] = generateId(newRectangle)
    let rectangleCommand = {
      id: newRectangle["uid"],
      rectangleObject: newRectangle
    }
    clientSocket.emit('draw-from-client', channelId, rectangleCommand)
    canvas.add(newRectangle)
  }

export function drawRectangle (
    rectangleCommand: any,
    canvas: any
) {
    let rect = rectangleCommand.rectangleObject
    const newRectangle = new fabric.Rect({
      left: rect.left,
      top: rect.top,
      fill: rect.fill,
      stroke: rect.stroke,
      width: rect.width,
      height: rect.height,
      scaleX: rect.scaleX,
      scaleY: rect.scaleY
    })
    newRectangle["uid"] = rectangleCommand.id
    canvas.add(newRectangle)
}
