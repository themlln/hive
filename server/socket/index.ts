const drawings: object = {}

const getDrawing = (drawingName: String) => {
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

    socket.on('draw-from-client', (drawingName: any, start: [number, number], end: [number, number], color: string, width: number) => {
      const drawing = getDrawing(drawingName)
      const line = `M ${start[0]} ${start[1]} L ${end[0]} ${end[1]} z`
      drawing.push([line, color, width])
      socket.broadcast.to(drawingName).emit('draw-from-server', line, color, width)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
