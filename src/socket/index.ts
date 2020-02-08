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

    socket.on('draw-from-client', (drawingName: any, pathCommand: any) => {
      const drawing = getDrawing(drawingName)
      drawing.push(pathCommand)
      console.log(pathCommand)
      socket.broadcast.to(drawingName).emit('draw-from-server', pathCommand)
    })


    socket.on('clear-canvas', (drawingName: any) => {
      drawings[drawingName] = []
      socket.broadcast.to(drawingName).emit('clear-canvas')
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })


  })
}
