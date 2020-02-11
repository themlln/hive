import { fabric } from 'fabric'
import { clientSocket, channelId, PathCommand} from '../fabricCanvas'
import {generateId} from './id'

export function modifyObject(
    canvas: any,
    modifiedCommand:any
){
      const allObjects = canvas.getObjects()
      const objectToModify = allObjects.filter(object => object.uid === modifiedCommand.id)
      const modifiedObject = modifiedCommand.modifiedObject
  
      if(objectToModify[0].text) {
        objectToModify[0].text = modifiedObject.text
      }

      objectToModify[0].width = modifiedObject.width
      objectToModify[0].height = modifiedObject.height,
      objectToModify[0].left = modifiedObject.left,
      objectToModify[0].top = modifiedObject.top,
      objectToModify[0].scaleX = modifiedObject.scaleX,
      objectToModify[0].scaleY = modifiedObject.scaleY,
      objectToModify[0].translateX =  modifiedObject.translateX,
      objectToModify[0].translateY = modifiedObject.translateY

      canvas.requestRenderAll()
}