import { BananaPool } from './banana-pool.js'
import { BananaState } from './banana.js'
import { BlinkHandler } from './blink-handler.js'
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

  blinkHandler = new BlinkHandler(300, 5)

  shootStateDuration = 200
  startShootTimeStamp = 0

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
    if (this.blinkHandler.isHidden) return

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

    this.sourceY = this.frameHeight * this.state.description

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

    if (inputHandler.keys.has(Key.Space) && this.state === PlayerState.normal) {
      this.shoot(this.destinationX, this.destinationY)
      this.state = PlayerState.shoot
      this.startShootTimeStamp = timeStamp
    }

    if (
      this.state === PlayerState.shoot &&
      timeStamp - this.startShootTimeStamp >= this.shootStateDuration
    )
      this.state = PlayerState.normal

    if (this.state === PlayerState.normal && this.collisionIsDetected())
      this.state = PlayerState.collision
    if (
      this.state === PlayerState.collision &&
      !this.blinkHandler.checkCurrentBlink(timeStamp)
    )
      this.state = PlayerState.normal
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

      if (
        !banana.isActive ||
        this.destinationX >
          banana.destinationX + banana.destinationWidth - 20 ||
        this.destinationX + this.frameWidth - 20 < banana.destinationX ||
        this.destinationY >
          banana.destinationY + banana.destinationHeight - 20 ||
        this.destinationY + this.frameHeight - 20 < banana.destinationY
      )
        continue
      else if (banana.state === BananaState.killed) continue
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
  normal: Symbol(0),
  collision: Symbol(1),
  peaLoad: Symbol(2),
  shoot: Symbol(2),
})
