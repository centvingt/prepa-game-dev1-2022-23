import { BlinkHandler } from '../handlers/blink-handler.js'
import { Game, GameState } from '../game.js'
import { BananaMovementHorizontalLinear } from './banana-movement-Horizontal-linear.js'
import { BananaMovementCircularAroundBoss } from './banana-movement-circular-around-boss.js'

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
    this.game = game
    this.ctx = game.ctx
    this.gameWidth = game.width
    this.gameHeight = game.height
    this.timestamp = game.timestamp

    this.frameWidth = 49
    this.frameHeight = 54

    // const scaleFactor = Math.random() * 0.3 + 0.85
    const scaleFactor = 1
    this.destinationWidth = this.frameWidth * scaleFactor
    this.destinationHeight = this.frameHeight * scaleFactor

    this.increaseScore = game.score.increase

    this.blinkHandler = new BlinkHandler(100, 3, this)

    this.movementHorizontalLinear = new BananaMovementHorizontalLinear(this)
    this.movementCircularAroundBoss = new BananaMovementCircularAroundBoss(this)

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

    switch (this.game.state) {
      case GameState.introLevel1:
        this.movementCircularAroundBoss.update()
        break
      case GameState.level1:
        this.movementHorizontalLinear.update()
        break
      default:
        break
    }
  }

  initialize() {
    switch (this.game.state) {
      case GameState.introLevel1:
        this.movementCircularAroundBoss.initialize()
        break
      case GameState.level1:
        this.movementHorizontalLinear.initialize()
        break
      default:
        break
    }

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
