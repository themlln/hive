import { fabric } from 'fabric'
import {PathCommand} from '../fabricCanvas'
import clientSocket from '../../sockets/chat-sockets'
import {generateId} from './id'
import { updateStrokeWidth } from '../../store/panel-store'


export function   addTriangle(
    stroke: string,
    fill: string,
    canvas: any,
    channelId: string
) {
    const newTriangle = new fabric.Triangle({
      left: 50,
      top: 50,
      width: 30,
      height: 30,
      fill: fill,
      stroke: stroke
    })

    newTriangle["uid"] = generateId(newTriangle)
    let triangleCommand = {
      id: newTriangle["uid"],
      triangleObject: newTriangle
    }

    clientSocket.emit('draw-from-client', channelId, triangleCommand)
    canvas.add(newTriangle)
  }

export function drawTriangle(
    triangleCommand: any,
    canvas: any
) {
    const triangle = triangleCommand.triangleObject
    const newTriangle = new fabric.Triangle({
      left: triangle.left,
      top: triangle.top,
      width: triangle.width,
      height: triangle.height,
      stroke: triangle.stroke,
      fill: triangle.fill,
      scaleX: triangle.scaleX,
      scaleY: triangle.scaleY,
      flipX: triangle.flipX,
      flipY: triangle.flipY
    })

    newTriangle["uid"] = triangleCommand.id
    canvas.add(newTriangle)
}
