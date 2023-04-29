import { BlinkHandler } from '../blink-handler.js'

export class BananaBoss {
  frameX = 0
  frameY = 0

  frameIndex = 0
  framesLength = 8
  fps = 1000 / 12
  speed = 50

  blinkHandler = new BlinkHandler(100, 3)

  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game
    this.ctx = this.game.ctx

    this.gameWidth = this.game.width
    this.gameHeight = this.game.height

    this.frameWidth = 204
    this.frameHeight = 148

    this.finalDestinationX = this.gameWidth - this.frameWidth - 50
    this.destinationY = (this.gameHeight - this.frameHeight) / 2

    this.image = new Image()
    this.image.src = './assets/img/banana-boss-spritesheet.png'

    this.increaseScore = this.game.score.increase

    this.initialize()
  }

  render = (timeStamp, deltaTime) => {
    this.draw()
    this.update(timeStamp, deltaTime)
  }

  draw() {
    if (this.blinkHandler.isHidden) return

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
  update(timeStamp, deltaTime) {
    this.frameIndex = Math.floor(timeStamp / this.fps) % this.framesLength
    this.frameX = this.frameIndex * this.frameWidth

    if (this.destinationX > this.finalDestinationX)
      this.destinationX -= (deltaTime * this.speed) / 1000
    else this.destinationX === this.finalDestinationX

    if (this.state === BananaBossState.touched) {
      this.isActive = this.blinkHandler.checkCurrentBlink(timeStamp)
    }

    this.frameY = this.frameHeight * this.state
  }

  initialize() {
    this.destinationX = this.gameWidth

    this.state = BananaBossState.normal
  }
}

export const BananaBossState = Object.freeze({
  normal: 0,
  touched: 1,
})
