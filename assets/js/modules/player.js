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
   * @param {() => void} decreaseLife
   * @param {(timesStamp: number, playerX: number, playerY: number) => void} shoot
   * @param {() => void} disableAllPeas
   */
  constructor(
    canvasWidth,
    canvasHeight,
    bananaPool,
    decreaseLife,
    shoot,
    disableAllPeas
  ) {
    this.image = new Image()
    this.image.src = './assets/img/player-spritesheet@2x.png'

    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.frameWidth = 94
    this.frameHeight = 72
    this.maxDestinationX = this.canvasWidth - this.frameWidth
    this.maxDestinationY = this.canvasHeight - this.frameHeight

    this.bananaPool = bananaPool

    this.decreaseLife = decreaseLife
    this.shoot = shoot
    this.disableAllPeas = disableAllPeas
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

    if (inputHandler.keys.has(Key.Space) && !this.collision)
      this.shoot(timeStamp, this.destinationX, this.destinationY)

    if (!this.collision) this.collision = this.collisionIsDetected()
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
  collisionIsDetected = () => {
    for (const banana of this.bananaPool.bananas) {
      if (
        !banana.isActive ||
        this.destinationX - 20 >
          banana.destinationX + banana.destinationWidth ||
        this.destinationX + this.frameWidth - 20 < banana.destinationX ||
        this.destinationY - 20 >
          banana.destinationY + banana.destinationHeight ||
        this.destinationY + this.frameHeight - 20 < banana.destinationY
      )
        continue
      else {
        banana.isActive = false
        this.disableAllPeas()
        this.decreaseLife()
        return true
      }
    }

    return false
  }
}
