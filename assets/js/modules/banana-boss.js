import { BlinkHandler } from './handlers/blink-handler.js'
import { Game } from './game.js'

export class BananaBoss {
  image = document.querySelector('.banana-boss-spritesheet')

  frameX = 0
  frameY = 0

  frameIndex = 0
  framesLength = 8
  fps = 1000 / 12
  speed = 50

  /**
   * @param {Game} game
   */
  constructor(game) {
    this.ctx = game.ctx

    this.timestamp = game.timestamp

    this.gameWidth = game.width
    this.gameHeight = game.height

    this.frameWidth = 204
    this.frameHeight = 148

    this.finalDestinationX = this.gameWidth - this.frameWidth - 50
    this.destinationY = (this.gameHeight - this.frameHeight) / 2

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
      this.frameWidth,
      this.frameHeight
    )
  }

  /**
   * @param {number} timeStamp
   */
  update() {
    this.frameIndex =
      Math.floor(this.timestamp.current / this.fps) % this.framesLength
    this.frameX = this.frameIndex * this.frameWidth

    if (this.destinationX > this.finalDestinationX)
      this.destinationX -= (this.timestamp.delta * this.speed) / 1000
    else this.destinationX = this.finalDestinationX

    if (this.state === BananaBossState.touched) {
      this.isActive = this.blinkHandler.checkCurrentBlink()
    }

    this.frameY = this.frameHeight * this.state
  }

  initialize() {
    this.destinationX = this.gameWidth

    this.state = BananaBossState.normal
  }

  /**
   * Masquer l’instance
   * @param {boolean} boolean
   * @returns {void}
   */
  hide = (boolean) => (this.isHidden = boolean)
}

export const BananaBossState = Object.freeze({
  normal: 0,
  touched: 1,
})
