import * as React from 'react'
import {EventEmitter} from 'events'

export const events = new EventEmitter();
const canvas = document.createElement('canvas')
const ctx: any = canvas.getContext('2d')

let currentMousePosition: any = {x: 0, y: 0}
let lastMousePosition: any = {x: 0, y: 0}

export function draw (start: [number, number], end: [number, number], strokeColor: string = 'black', shouldBroadcast: boolean = true) {
  ctx.beginPath()
  ctx.strokeStyle = strokeColor
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.closePath()
  ctx.stroke()

  shouldBroadcast && events.emit('draw', start, end, strokeColor)
}

export const setupCanvas = () => {
  window.addEventListener('mousedown', (event) => {
    currentMousePosition = pos(event)
  })
  window.addEventListener('mousemove', (event) => {
    if (!event.buttons) return
    lastMousePosition = currentMousePosition
    currentMousePosition = pos(event)
    lastMousePosition && currentMousePosition && draw(lastMousePosition, currentMousePosition, 'black', true)
  })
}

const pos = (event) => {
  return [
    event.pageX - canvas.offsetLeft,
    event.pageY - canvas.offsetTop
  ]
}

export class Whiteboard extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <canvas ref="canvas" width={500} height={500} />
        
        <div>Hello World</div>
      </div>
    )
  }
}
