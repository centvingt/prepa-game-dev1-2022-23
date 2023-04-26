import { BananaPool } from './banana-pool.js'
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

  collision = false
  maxCollisionBlink = 3
  collisionBlinkDuration = 500
  lastBlinkTimestamp = 0
  elapsedBlinkTime = 0
  isHidden = false

  /**
   * Description
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   * @param {BananaPool} bananaPool
   */
  constructor(canvasWidth, canvasHeight, bananaPool) {
    this.image = new Image()
    this.image.src = './assets/img/player-spritesheet@2x.png'

    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.frameWidth = 94
    this.frameHeight = 72
    this.maxDestinationX = this.canvasWidth - this.frameWidth
    this.maxDestinationY = this.canvasHeight - this.frameHeight

    this.bananaPool = bananaPool
  }

  /**
   * Description
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (this.isHidden) return

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

    if (!this.collision) this.collision = this.isACollision()
    else {
      if (this.lastBlinkTimestamp === 0) this.lastBlinkTimestamp = timeStamp

      this.elapsedBlinkTime += timeStamp - this.lastBlinkTimestamp

      const collisionBlink = Math.floor(
        this.elapsedBlinkTime / this.collisionBlinkDuration
      )

      this.isHidden = collisionBlink % 2 === 0

      this.lastBlinkTimestamp = timeStamp

      if (collisionBlink >= this.maxCollisionBlink) {
        this.collision = false
        this.isHidden = false
        this.lastBlinkTimestamp = 0
        this.elapsedBlinkTime = 0
      }
    }
  }

  /**
   * Retourne true si le joueur percute une banane
   * @returns {boolean}
   */
  isACollision = () => {
    for (const banana of this.bananaPool.bananas) {
      if (
        !banana.isActive ||
        this.destinationX > banana.destinationX + banana.width ||
        this.destinationX + this.frameWidth < banana.destinationX ||
        this.destinationY > banana.destinationY + banana.height ||
        this.destinationY + this.frameHeight < banana.destinationY
      )
        continue
      else {
        banana.isActive = false
        return true
      }
    }

    return false
  }
}
