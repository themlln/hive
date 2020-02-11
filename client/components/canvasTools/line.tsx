import { fabric } from 'fabric'
import {PathCommand} from '../fabricCanvas'
import {generateId} from './id'
import { clientSocket, channelId } from '../home'

export function line (
    start: Array<number> = [0,0],
    end: Array<number> = [0,0],
    fill: string,
    stroke: string,
    strokeWidth: number,
    canvas: any
  ) {
    const newLine = new fabric.Line([...start, ...end], {
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
      selectable: true
    })

    newLine["uid"] = generateId(newLine)
    let lineCommand = {
      id: newLine["uid"],
      lineObject: newLine
    }

    clientSocket.emit('draw-from-client', channelId, lineCommand)
    canvas.add(newLine)
  }

  export function drawLine (
    lineCommand: any,
    canvas: any
  ){
    let line = lineCommand.lineObject
    const newLine = new fabric.Line([line.x1, line.y1, line.x2, line.y2], {
      top: line.top,
      left: line.left,
      scaleX: line.scaleX,
      scaleY: line.scaleY,
      fill: line.fill,
      width: line.width,
      height: line.height,
      stroke: line.stroke,
      strokeWidth: line.strokeWidth,
      selectable: true
    })

    newLine["uid"] = lineCommand.id
    canvas.add(newLine)
  }
