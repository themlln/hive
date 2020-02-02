import {EventEmitter} from 'events'

export const events: EventEmitter = new EventEmitter();
export const canvas: HTMLCanvasElement = document.createElement('canvas')
const ctx: any = canvas.getContext('2d')

export let currentMousePosition: any = {x: 0, y: 0}
export let lastMousePosition: any = {x: 0, y: 0}

export function draw (start: [number, number], end: [number, number], strokeColor: string = 'black', shouldBroadcast: boolean = true) {
  ctx.beginPath()
  ctx.strokeStyle = strokeColor
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.closePath()
  ctx.stroke()

  shouldBroadcast && events.emit('draw', start, end, strokeColor)
}

export const resize = () => {
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  const pixelRatio: number = window.devicePixelRatio || 1

  const w: number = canvas.clientWidth * pixelRatio
  const h: number = canvas.clientHeight * pixelRatio

  if (w !== canvas.width || h !== canvas.height) {
    const imgData: object = ctx.getImageData(0, 0, canvas.width, canvas.height)

    canvas.width = w
    canvas.height = h

    ctx.putImageData(imgData, 0, 0)
  }
  ctx.scale(pixelRatio, pixelRatio)

  ctx.lineWidth = 5
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
}

export const position = (event: any) => {
  return [
    event.pageX - canvas.offsetLeft,
    event.pageY - canvas.offsetTop
  ]
}

export const setupCanvas = () => {
  resize()
  canvas.addEventListener('resize', resize)

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
