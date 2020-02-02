import * as io from 'socket.io-client'
import { draw, events } from './whiteboard-utilities'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('load', (strokes: any) => {
  strokes.forEach((stroke: any) => {
    const { start, end, color } = stroke
    draw(start, end, color, false)
  })
})

socket.on('draw', (start: any, end: any, color: string) => {
  draw(start, end, color, false)
})

events.on('draw', (start: any, end: any, color: string) => {
  socket.emit('draw', start, end, color)
})

export default socket
