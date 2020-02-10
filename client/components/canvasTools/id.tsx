export function generateId (object: any) {
    let idArray = [object.left, object.top, object.width, object.height]
    let idString = idArray.join("").split(".").join("")
    return idString
}