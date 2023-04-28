import { BananaPool } from './banana-pool.js'
import { BananaState } from './banana.js'
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

  state = PlayerState.normal
  maxBlink = 7
  blinkDuration = 300
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
    this.image.src = './assets/img/player-spritesheet.png'

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
      this.sourceX,
      this.sourceY,
      this.frameWidth,
      this.frameHeight,
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
    this.sourceX = this.frameIndex * this.frameWidth

    this.sourceY = this.frameHeight * this.state

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

    if (inputHandler.keys.has(Key.Space) && this.state === PlayerState.normal)
      this.shoot(timeStamp, this.destinationX, this.destinationY)

    // if (!this.collision) this.collision = this.collisionIsDetected()

    if (this.state === PlayerState.normal && this.collisionIsDetected())
      this.state = PlayerState.collision
    if (this.state === PlayerState.collision) {
      if (this.lastBlinkTimestamp === 0) this.lastBlinkTimestamp = timeStamp

      this.elapsedBlinkTime += timeStamp - this.lastBlinkTimestamp

      const collisionBlink = Math.floor(
        this.elapsedBlinkTime / this.blinkDuration
      )

      this.isHidden = collisionBlink % 2 === 0

      this.lastBlinkTimestamp = timeStamp

      if (collisionBlink >= this.maxBlink) {
        this.state = PlayerState.normal
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
      const collisionCondition =
        this.destinationX >
          banana.destinationX + banana.destinationWidth - 20 ||
        this.destinationX + this.frameWidth - 20 < banana.destinationX ||
        this.destinationY >
          banana.destinationY + banana.destinationHeight - 20 ||
        this.destinationY + this.frameHeight - 20 < banana.destinationY
      if (banana.state === BananaState.killed && !collisionCondition) {
        banana.isActive = false
      }
      if (!banana.isActive || collisionCondition) continue
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

const PlayerState = Object.freeze({
  normal: 0,
  collision: 1,
  peaLoad: 2,
})
