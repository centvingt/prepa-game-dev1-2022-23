import { BlinkHandler } from '../handlers/blink-handler.js'
import { Game } from '../game.js'

export class CannedPeas {
  image = document.querySelector('.canned-peas-spritesheet')

  frameX = 0
  frameY = 0

  frameIndex = 0
  framesLength = 8
  fps = 1000 / 12

  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game
    this.ctx = game.ctx
    this.gameWidth = game.width
    this.gameHeight = game.height
    this.timestamp = game.timestamp

    this.frameWidth = 38
    this.frameHeight = 41.5

    this.increaseScore = game.level.increaseValueBy

    this.appearanceBlinkHandler = new BlinkHandler(100, 7, this)
    this.disappearanceBlinkHandler = new BlinkHandler(100, 9, this)

    this.timerAppearance = 6000

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

  update() {
    this.timer += this.timestamp.delta

    if (this.timer >= this.timerAppearance)
      this.state = CannedPeasState.disappearance

    this.frameIndex =
      Math.floor(this.timestamp.current / this.fps) % this.framesLength
    this.frameX = this.frameIndex * this.frameWidth

    if (
      this.state === CannedPeasState.appearance &&
      !this.appearanceBlinkHandler.checkCurrentBlink()
    )
      this.state = CannedPeasState.normal

    if (
      this.state === CannedPeasState.disappearance &&
      !this.disappearanceBlinkHandler.checkCurrentBlink()
    )
      this.isActive = false

    this.frameY = this.frameHeight * this.state.description
  }

  initialize() {
    this.isActive = true
    this.isHidden = false
    this.state = CannedPeasState.appearance

    this.destinationX = Math.random() * (this.gameWidth - this.frameWidth)
    this.destinationY = Math.random() * (this.gameHeight - this.frameHeight)

    this.timer = 0
  }

  /**
   * Masquer l’instance
   * @param {boolean} boolean
   * @returns {void}
   */
  hide = (boolean) => (this.isHidden = boolean)
}

export const CannedPeasState = Object.freeze({
  normal: Symbol(0),
  appearance: Symbol(0),
  disappearance: Symbol(1),
})
