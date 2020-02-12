import { fabric } from 'fabric'
import {PathCommand} from '../fabricCanvas'
import {generateId} from './id'
import clientSocket from '../../sockets/chat-sockets'

export function draw (
    start: any = [0,0],
    end: any = [0,0],
    strokeWidth: number,
    strokeColor: string,
    canvas: any
  ) {
    canvas.freeDrawingBrush.width = strokeWidth
    canvas.freeDrawingBrush.color = strokeColor
    canvas.isDrawingMode = true
  }

export function sendDrawing (
  canvas: any,
  shouldBroadcast: boolean,
  isSelected: boolean,
  channelId: string
) {
  const index = canvas._objects.length - 1
  const path = canvas._objects[index]
  const newId = generateId(path)
  path["uid"] = newId

  let pathCommand: PathCommand = {
    id: path["uid"],
    path: path
  }
  shouldBroadcast && !isSelected && clientSocket.emit('draw-from-client', channelId, pathCommand)
}


export function drawPath (
  pathCommand: any,
  canvas: any
) {
  const newPath = new fabric.Path(pathCommand.path.path)
          newPath.set({
            left: pathCommand.path.left,
            top: pathCommand.path.top,
            width: pathCommand.path.width,
            height: pathCommand.path.height,
            fill: pathCommand.path.fill,
            stroke: pathCommand.path.stroke,
            scaleX: pathCommand.path.scaleX,
            scaleY: pathCommand.path.scaleY,
            strokeWidth: pathCommand.path.strokeWidth,
            flipX: pathCommand.path.flipX,
            flipY: pathCommand.path.flipY
          })
          newPath["uid"] = pathCommand.id
          canvas.add(newPath)
}
