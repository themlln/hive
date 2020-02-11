import { fabric } from 'fabric'
import {PathCommand} from '../fabricCanvas'
import { clientSocket, channelId } from '../home'
import {generateId} from './id'


export function   addTriangle(
    fill: string,
    canvas: any
) {
    const newTriangle = new fabric.Triangle({
      left: 50,
      top: 50,
      width: 30,
      height: 30,
      fill: fill
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
      fill: triangle.fill,
      scaleX: triangle.scaleX,
      scaleY: triangle.scaleY
    })

    newTriangle["uid"] = triangleCommand.id
    canvas.add(newTriangle)
}
