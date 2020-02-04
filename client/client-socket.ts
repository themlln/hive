// import { Canvas, events } from './components/canvas'
// import * as createClientSocket from 'socket.io-client'

// export const clientSocket: any = createClientSocket(window.location.origin)
// export const drawingName: String = '/canvas'

// clientSocket.on('connect', () => {
//   console.log('Client-Socket: I have a made a persistent two-way connection!')
//   clientSocket.emit('join-drawing', drawingName)
// })

// clientSocket.on('replay-drawing', (instructions: any) => {
//   instructions.forEach((instruction: any) => Canvas.prototype.draw(...instruction, false))
// })

// clientSocket.on('draw-from-server', (start: any, end: any, color: string) => {
//   Canvas.prototype.draw(start, end, color, false);
// })

// events.on('draw', (start: any, end: any, color: string) => {
//   clientSocket.emit('draw-from-client', drawingName, start, end, color)
// })
