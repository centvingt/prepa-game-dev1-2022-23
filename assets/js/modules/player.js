import { InputHandler } from './input-handler.js'
import { Key } from './key.js'

export class Player {
  ammunitionLoading = true
  speed = 3

  sourceX = 0
  sourceY = 0
  destinationX = 25
  destinationY = 100

  frameIndex = 0
  framesLength = 8
  fps = 1000 / 12

  /**
   * Description
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   */
  constructor(canvasWidth, canvasHeight) {
    this.image = new Image()
    this.image.src = './assets/img/player-spritesheet@2x.png'

    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.frameWidth = 94
    this.frameHeight = 72
    this.maxDestinationX = this.canvasWidth - this.frameWidth
    this.maxDestinationY = this.canvasHeight - this.frameHeight
  }

  /**
   * Description
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameIndex * this.frameWidth * 2,
      this.sourceY,
      this.frameWidth * 2,
      this.frameHeight * 2,
      this.destinationX,
      this.destinationY,
      this.frameWidth,
      this.frameHeight
    )
  }

  /**
   * Description
   * @param {number} timeStamp
   * @param {InputHandler} inputHandler
   */
  update(timeStamp, inputHandler) {
    this.frameIndex = Math.floor(timeStamp / this.fps) % this.framesLength

    if (inputHandler.keys.has(Key.ArrowDown)) this.destinationY += this.speed
    if (inputHandler.keys.has(Key.ArrowUp)) this.destinationY -= this.speed
    if (inputHandler.keys.has(Key.ArrowLeft)) this.destinationX -= this.speed
    if (inputHandler.keys.has(Key.ArrowRight)) this.destinationX += this.speed

    if (this.destinationX < 0) this.destinationX = 0
    if (this.destinationX > this.maxDestinationX)
      this.destinationX = this.maxDestinationX
    if (this.destinationY < 0) this.destinationY = 0
    if (this.destinationY > this.maxDestinationY)
      this.destinationY = this.maxDestinationY
  }
}
