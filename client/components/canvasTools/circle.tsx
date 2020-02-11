import { fabric } from 'fabric'
import {PathCommand} from '../fabricCanvas'
import {generateId} from './id'
import { clientSocket, channelId } from '../home'

export function addCircle(
    stroke: string,
    fill: string,
    canvas: any
) {
    const newCircle = new fabric.Circle({
      radius: 15,
      left: 100,
      top: 100,
      fill: fill,
      stroke: stroke
    });
    newCircle["uid"] = generateId(newCircle)
    let circleCommand = {
      id: newCircle["uid"],
      circleObject: newCircle
    }
    clientSocket.emit('draw-from-client', channelId, circleCommand)
    canvas.add(newCircle)
  }

export function drawCircle(
    circleCommand: any,
    canvas: any
){
    let circle = circleCommand.circleObject
    const newCircle = new fabric.Circle({
        radius: circle.radius,
        left: circle.left,
        top: circle.top,
        fill: circle.fill,
        stroke: circle.stroke,
        scaleX: circle.scaleX,
        scaleY: circle.scaleY
      });
      newCircle["uid"] = circleCommand.id
      canvas.add(newCircle)
}
