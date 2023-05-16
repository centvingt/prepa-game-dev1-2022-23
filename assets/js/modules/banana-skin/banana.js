import { BlinkHandler } from '../handlers/blink-handler.js'
import { Game, GameState } from '../game.js'

export class Banana {
  image = document.querySelector('.banana-spritesheet')

  frameX = 0
  frameY = 0

  frameIndex = 0
  framesLength = 16
  fps = 1000 / 12

  /**
   * @param {Game} game
   * @param {{update: () => void}} movement
   * @param {number} index
   */
  constructor(game, movement, index) {
    this.game = game
    this.ctx = game.ctx
    this.gameWidth = game.width
    this.gameHeight = game.height
    this.timestamp = game.timestamp

    this.frameWidth = 49
    this.frameHeight = 54

    this.increaseScore = game.level.increaseValueBy

    this.blinkHandler = new BlinkHandler(100, 3, this)

    this.initialize(movement, index)
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

    this.movement.update()

    if (this.state === BananaState.killed)
      this.isActive = this.blinkHandler.checkCurrentBlink()

    this.frameY = this.frameHeight * this.state

    if (this.destinationX < -this.destinationWidth) {
      this.isActive = false
      if (this.game.state === GameState.level1) this.increaseScore(-2)
    }
  }

  initialize(movement, index) {
    this.destinationWidth = this.frameWidth
    this.destinationHeight = this.frameHeight

    this.index = index
    /** @type {{update: () => void, start: boolean || undefined}} */ this.movement =
      new movement(this)

    this.isActive = true
    this.state = BananaState.normal
    this.isHidden = false
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
