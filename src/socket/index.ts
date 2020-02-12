const drawings: object = {}
const messages: object = {}

const getType = (channelId: string, type: object) => {
  if (!type[channelId]) {
    type[channelId] = []
  }
  return type[channelId]
}

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join-drawing', (channelId: any) => {
      socket.join(channelId)
      const instructions = getType(channelId, drawings)
      socket.emit('replay-drawing', instructions)
    })

    socket.on('draw-from-client', (channelId: any, command: any) => {
      const drawing = getType(channelId, drawings)
      drawing.push(command)
      if(command.textObject) {
        socket.broadcast.to(channelId).emit('text-from-server', command)
      } else if (command.circleObject) {
        socket.broadcast.to(channelId).emit('circle-from-server', command)
      } else if (command.rectangleObject) {
        socket.broadcast.to(channelId).emit('rectangle-from-server', command)
      } else if (command.triangleObject) {
        socket.broadcast.to(channelId).emit('triangle-from-server', command)
      } else if (command.lineObject) {
        socket.broadcast.to(channelId).emit('line-from-server', command)
      } else if (command.path){
        socket.broadcast.to(channelId).emit('draw-from-server', command)
      }
    })

    socket.on('delete-object-from-client', (channelId: string, deleteCommand: any) => {
      const instructions = getType(channelId, drawings)
      const newInstructions = instructions.filter( (instruction:object) => instruction.id !== deleteCommand.id)
      drawings[channelId] = newInstructions
      socket.broadcast.to(channelId).emit('delete-object-from-server', deleteCommand)
    })

    socket.on('modified-from-client', (channelId: any, modifiedCommand: any) => {
      const instructions = getType(channelId, drawings)
      const modifiedObject = instructions.filter(instruction => instruction.id === modifiedCommand.id)
      modifiedObject[0].path = modifiedCommand.modifiedObject
      modifiedObject[0].textObject = modifiedCommand.modifiedObject
      if (modifiedObject[0].rectangleObject) {modifiedObject[0].rectangleObject = modifiedCommand.modifiedObject}
      if (modifiedObject[0].circleObject) {modifiedObject[0].circleObject = modifiedCommand.modifiedObject}
      if (modifiedObject[0].triangleObject) {modifiedObject[0].triangleObject = modifiedCommand.modifiedObject}
      if (modifiedObject[0].path) { modifiedObject[0].path = modifiedCommand.modifiedObject }
      if (modifiedObject[0].textObject) {modifiedObject[0].textObject = modifiedCommand.modifiedObject}
      if (modifiedObject[0].lineObject) {modifiedObject[0].lineObject = modifiedCommand.modifiedObject}
      socket.broadcast.to(channelId).emit('modified-from-server', modifiedCommand)
    })

    socket.on('clear-canvas', (channelId: string) => {
      drawings[channelId] = []
      socket.broadcast.to(channelId).emit('clear-canvas')
    })

    socket.on('load-messages', (channelId: string, messagesToLoad: Array<object>) => {
      const channelMessages = getType(channelId, messages)
      console.log("THIS IS FROM THE SERVER, WE ARE REPLAYING CHANNEL MESSAGES", channelMessages)
      socket.broadcast.to(channelId).emit('replay-messages', channelMessages)
    })

    socket.on('new-message', (channelId: string, message: object) => {
      const channelMessages = getType(channelId, messages)
      channelMessages.push(message)
      socket.broadcast.to(channelId).emit('receive-message', message)
    })

    socket.on('delete-message', (channelId: string, messageToDelete: object) => {
      const channelMessages = getType(channelId, messages)
      const updatedMessages = channelMessages.filter((message: object) => message.id !== messageToDelete.id)
      channelMessages[channelId] = updatedMessages
      socket.broadcast.to(channelId).emit('delete-message-from-server', messageToDelete)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
