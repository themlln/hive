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

    socket.on('draw-from-client', (drawingName: any, command: any) => {
      const drawing = getDrawing(drawingName)
      drawing.push(command)
      if(command.textObject) {
        socket.broadcast.to(drawingName).emit('text-from-server', command)
      } else {
        socket.broadcast.to(drawingName).emit('draw-from-server', command)
      }
    })

    socket.on('delete-object-from-client', (drawingName: String, deleteCommand: any) => {
      const instructions = getDrawing(drawingName)
      const newInstructions = instructions.filter( instruction => instruction.id !== deleteCommand.id)
      drawings[drawingName] = newInstructions
      socket.broadcast.to(drawingName).emit('delete-object-from-server', deleteCommand)
    })

    socket.on('modified-from-client', (drawingName: any, modifiedCommand: any) => {
      const instructions = getDrawing(drawingName), 
      const modifiedObject = instructions.filter(instruction => instruction.id === modifiedCommand.id)
      console.log(modifiedObject[0])
      console.log(modifiedObject[0].textObject)
      modifiedObject[0].path = modifiedCommand.modifiedObject
      modifiedObject[0].textObject = modifiedCommand.modifiedObject
      socket.broadcast.to(drawingName).emit('modified-from-server', modifiedCommand)
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
