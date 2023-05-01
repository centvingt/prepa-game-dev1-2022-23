import { BlinkHandler } from './handlers/blink-handler.js'
import { Game } from './game.js'

export class Banana {
  image = document.querySelector('.banana-spritesheet')

  frameX = 0
  frameY = 0

  frameIndex = 0
  framesLength = 16
  fps = 1000 / 12

  /**
   * @param {Game} game
   */
  constructor(game) {
    this.ctx = game.ctx
    this.gameWidth = game.width
    this.gameHeight = game.height
    this.timestamp = game.timestamp

    this.frameWidth = 49
    this.frameHeight = 54

    const scaleFactor = Math.random() * 0.3 + 0.85
    this.destinationWidth = this.frameWidth * scaleFactor
    this.destinationHeight = this.frameHeight * scaleFactor

    this.increaseScore = game.score.increase

    this.isHidden = false
    this.blinkHandler = new BlinkHandler(100, 3, this)

    this.initialize()
  }

  render = () => {
    this.draw()
    this.update()
  }

  draw() {
    if (this.isHidden) return

    this.ctx.drawImage(
      this.image,
      this.frameX,
      this.frameY,
      this.frameWidth,
      this.frameHeight,
      this.destinationX,
      this.destinationY,
      this.destinationWidth,
      this.destinationHeight
    )
  }

  update() {
    this.frameIndex =
      Math.floor(this.timestamp.current / this.fps) % this.framesLength
    this.frameX = this.frameIndex * this.frameWidth

    this.destinationX -= (this.timestamp.delta * this.speed) / 1000

    if (this.state === BananaState.killed) {
      this.isActive = this.blinkHandler.checkCurrentBlink()
    }

    this.frameY = this.frameHeight * this.state

    if (this.destinationX < -this.destinationWidth) {
      this.isActive = false
      this.increaseScore(-2)
      this.blinkHandler.reset()
    }
  }

  initialize() {
    this.destinationX = this.gameWidth
    this.destinationY =
      Math.random() * (this.gameHeight - this.destinationHeight)
    this.speed = Math.random() * 50 + 100

    this.isActive = true
    this.state = BananaState.normal
  }

  /**
   * Masquer l’instance
   * @param {boolean} boolean
   * @returns {void}
   */
  hide = (boolean) => (this.isHidden = boolean)
}

export const BananaState = Object.freeze({
  normal: 0,
  killed: 1,
})
