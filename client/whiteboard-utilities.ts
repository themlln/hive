// import {EventEmitter} from 'events'
// export const events: EventEmitter = new EventEmitter();

// export let currentMousePosition: any = {x: 0, y: 0}
// export let lastMousePosition: any = {x: 0, y: 0}

// export function draw (
//     start: any = [0,0],
//     end: any = [0,0],
//     strokeColor: string = 'black',
//     shouldBroadcast: boolean = true,
//     canvas: HTMLCanvasElement = new HTMLCanvasElement()
//   ) {
//     const ctx: any = canvas.getContext('2d')

//     ctx.beginPath()
//     ctx.strokeStyle = strokeColor
//     ctx.moveTo(start[0], start[1])
//     ctx.lineTo(end[0], end[1])
//     ctx.closePath()
//     ctx.stroke()

//     shouldBroadcast && events.emit('draw', start, end, strokeColor)
// }

// export const resize = (canvas: HTMLCanvasElement = new HTMLCanvasElement()) => {
//   const ctx: any = canvas.getContext('2d')
//   ctx.setTransform(1, 0, 0, 1, 0, 0)
//   const pixelRatio: number = window.devicePixelRatio || 1

//   const w: number = canvas.clientWidth * pixelRatio
//   const h: number = canvas.clientHeight * pixelRatio

//   if (w !== canvas.width || h !== canvas.height) {
//     const imgData: object = ctx.getImageData(0, 0, canvas.width, canvas.height)

//     canvas.width = w
//     canvas.height = h

//     ctx.putImageData(imgData, 0, 0)
//   }
//   ctx.scale(pixelRatio, pixelRatio)

//   ctx.lineWidth = 5
//   ctx.lineJoin = 'round'
//   ctx.lineCap = 'round'
// }

// export const position = (event: any, canvas: HTMLCanvasElement = new HTMLCanvasElement()) => {
//   return [
//     event.pageX - canvas.offsetLeft,
//     event.pageY - canvas.offsetTop
//   ]
// }

// export const setupCanvas = () => {
//   resize()
//   canvas.addEventListener('resize', resize)

<<<<<<< HEAD
//   canvas.addEventListener('mousedown', (event: any) => {
//     console.log('EVENT - mousedown', event)
//     currentMousePosition = position(event)
//   })
//   canvas.addEventListener('mousemove', (event: any) => {
//     if (!event.buttons) return
//     lastMousePosition = currentMousePosition
//     currentMousePosition = position(event)
//     lastMousePosition && currentMousePosition && draw(lastMousePosition, currentMousePosition, 'black', true)
//   })
// }
||||||| merged common ancestors
  canvas.addEventListener('mousedown', (event: any) => {
    console.log('EVENT - mousedown', event)
    currentMousePosition = position(event)
  })
  canvas.addEventListener('mousemove', (event: any) => {
    if (!event.buttons) return
    lastMousePosition = currentMousePosition
    currentMousePosition = position(event)
    lastMousePosition && currentMousePosition && draw(lastMousePosition, currentMousePosition, 'black', true)
  })
}
=======
  canvas.addEventListener('mousedown', (event: any) => {
    currentMousePosition = position(event)
  })
  canvas.addEventListener('mousemove', (event: any) => {
    if (!event.buttons) return
    lastMousePosition = currentMousePosition
    currentMousePosition = position(event)
    lastMousePosition && currentMousePosition && draw(lastMousePosition, currentMousePosition, 'black', true)
  })
}
>>>>>>> origin/pseudomaster
