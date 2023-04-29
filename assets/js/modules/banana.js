import { BlinkHandler } from './blink-handler.js'
import { Game } from './game.js'

export class Banana {
  sourceX = 0
  sourceY = 0

  frameIndex = 0
  framesLength = 16
  fps = 1000 / 12

  maxBlink = 3
  blinkDuration = 100

  blinkHandler = new BlinkHandler(100, 3)

  /**
   * Description
   * @param {Game} game
   */
  constructor(game) {
    this.game = game
    this.ctx = this.game.ctx

    this.sourceWidth = 49
    this.sourceHeight = 54

    const scaleFactor = Math.random() * 0.3 + 0.85
    this.destinationWidth = this.sourceWidth * scaleFactor
    this.destinationHeight = this.sourceHeight * scaleFactor

    this.image = new Image()
    this.image.src = './assets/img/banana-spritesheet.png'

    this.increaseScore = this.game.score.increase

    this.initialize()
  }

  /**
   * Description
   * @param {CanvasRenderingContext2D} ctx
   */
  draw() {
    if (this.blinkHandler.isHidden) return

    this.ctx.drawImage(
      this.image,
      this.sourceX,
      this.sourceY,
      this.sourceWidth,
      this.sourceHeight,
      this.destinationX,
      this.destinationY,
      this.destinationWidth,
      this.destinationHeight
    )
  }

  /**
   * @param {number} timeStamp
   * @param {number} deltaTime
   */
  update(timeStamp, deltaTime) {
    this.frameIndex = Math.floor(timeStamp / this.fps) % this.framesLength
    this.sourceX = this.frameIndex * this.sourceWidth

    this.destinationX -= (deltaTime * this.speed) / 1000

    if (this.state === BananaState.killed) {
      this.isActive = this.blinkHandler.checkCurrentBlink(timeStamp)
    }

    this.sourceY = this.sourceHeight * this.state

    if (this.destinationX < -this.destinationWidth) {
      this.isActive = false
      this.increaseScore(-2)
      this.blinkHandler.reset()
    }
  }

  initialize() {
    this.destinationX = this.game.width
    this.destinationY =
      Math.random() * (this.game.height - this.destinationHeight)
    this.speed = Math.random() * 50 + 100

    this.isActive = true
    this.state = BananaState.normal
  }
}

export const BananaState = Object.freeze({
  normal: 0,
  killed: 1,
})
