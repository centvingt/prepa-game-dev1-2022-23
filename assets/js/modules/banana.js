import { Game } from './game.js'

export class Banana {
  sourceX = 0
  sourceY = 0

  frameIndex = 0
  framesLength = 16
  fps = 1000 / 12

  maxBlink = 5
  blinkDuration = 250

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
    if (this.isHidden) return

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
      if (this.lastBlinkTimestamp === 0) this.lastBlinkTimestamp = timeStamp

      this.elapsedBlinkTime += timeStamp - this.lastBlinkTimestamp

      const collisionBlink = Math.floor(
        this.elapsedBlinkTime / this.blinkDuration
      )

      this.isHidden = collisionBlink % 2 === 0

      this.lastBlinkTimestamp = timeStamp

      if (collisionBlink >= this.maxBlink) this.isActive = false
    }

    this.sourceY = this.sourceHeight * this.state

    if (this.destinationX < -this.destinationWidth) {
      this.isActive = false
      this.increaseScore(-2)
    }
  }

  initialize() {
    this.isActive = true
    this.destinationX = this.game.width
    this.destinationY =
      Math.random() * (this.game.height - this.destinationHeight)
    this.speed = Math.random() * 50 + 100

    this.state = BananaState.normal
    this.lastBlinkTimestamp = 0
    this.elapsedBlinkTime = 0
    this.isHidden = false
  }
}

export const BananaState = Object.freeze({
  normal: 0,
  killed: 1,
})
