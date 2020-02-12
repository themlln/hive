export function generateId (object: any) {
    let randomNumber = Math.floor(Math.random()* 1000)
    let idArray = [randomNumber, object.left, object.top, object.width, object.height]
    let idString = idArray.join("").split(".").join("")
    return idString
  }