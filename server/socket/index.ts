const drawings: object = {}

const getDrawing = (drawingName: any) => {
  if (!drawings[drawingName]) {
    drawings[drawingName] = []
  }
  return drawings[drawingName]
}


module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join-drawing', (drawingName: any) => {
      socket.join(drawingName)
      const instructions = getDrawing(drawingName)
      socket.emit('replay-drawing', instructions)
    })

    socket.on('draw-from-client', (drawingName: any, start: [number, number], end: [number, number], color: string) => {
      const instructions = getDrawing(drawingName)
      instructions.push([start, end, color])
      socket.broadcast.to(drawingName).emit('draw-from-server', start, end, color)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
