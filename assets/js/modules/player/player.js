import { BlinkHandler } from '../handlers/blink-handler.js'
import { Game, GameState } from '../game.js'
import { PlayerMovementPatternControllable } from './player-movement-pattern-controllable.js'
import { PlayerBounds } from './player-bounds.js'
import { PlayerShoot } from './player-shoot.js'
import { PlayerCollision } from './player-collision.js'

export class Player {
  image = document.querySelector('img.player-spritesheet')

  ammunitionLoading = true
  speed = 3

  sourceX = 0
  sourceY = 0

  frameIndex = 0
  framesLength = 8
  fps = 1000 / 12

  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game
    this.ctx = game.ctx
    this.timestamp = game.timestamp
    this.inputKeys = game.inputHandler.keys

    this.canvasWidth = game.canvas.width
    this.canvasHeight = game.canvas.height

    this.canvasBorderLength = game.canvasBorderLength
    this.frameWidth = 89
    this.frameHeight = 70
    this.maxDestinationX =
      this.canvasWidth - this.frameWidth - this.canvasBorderLength
    this.maxDestinationY =
      this.canvasHeight - this.frameHeight - this.canvasBorderLength

    this.bananaPool = game.bananaPool

    this.decreaseLife = game.life.decrease
    this.peaPool = game.peaPool
    this.disableAllPeas = game.peaPool.disableAllPeas

    this.isHidden = false
    this.blinkHandler = new BlinkHandler(300, 5, this)

    this.initialize()

    this.bounds = new PlayerBounds(this)
    this.shoot = new PlayerShoot(this)
    this.collision = new PlayerCollision(this)

    this.movementPatternControllable = new PlayerMovementPatternControllable(
      this
    )
  }

  render = () => {
    this.draw()
    this.update()
  }

  draw() {
    if (this.isHidden) return

    this.ctx.drawImage(
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

  update() {
    this.frameIndex =
      Math.floor(this.timestamp.current / this.fps) % this.framesLength

    this.sourceX = this.frameIndex * this.frameWidth
    this.sourceY = this.frameHeight * this.state.description

    if (this.game.state === GameState.level1)
      this.movementPatternControllable.update()
  }

  initialize = () => {
    this.destinationX = 25
    this.destinationY = (this.canvasHeight - this.frameHeight) / 2
    this.state = PlayerState.normal
  }

  /**
   * Masquer l’instance
   * @param {boolean} boolean
   * @returns {void}
   */
  hide = (boolean) => (this.isHidden = boolean)
}

export const PlayerState = Object.freeze({
  normal: Symbol(0),
  shoot: Symbol(1),
  collision: Symbol(2),
  peaLoad: Symbol(3),
})
