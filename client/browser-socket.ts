import * as io from 'socket.io-client'
import { Canvas, events } from './components/canvas'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('load', (strokes: any) => {
  strokes.forEach((stroke: any) => {
    const { start, end, color } = stroke
    Canvas.prototype.draw(start, end, color, false)
  })
})

socket.on('draw', (start: any, end: any, color: string) => {
  Canvas.prototype.draw(start, end, color, false)
})

events.on('draw', (start: any, end: any, color: string) => {
  socket.emit('draw', start, end, color)
})

export default socket
