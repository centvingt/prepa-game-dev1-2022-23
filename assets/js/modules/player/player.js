import { BlinkHandler } from '../handlers/blink-handler.js'
import { Game, GameState } from '../game.js'
import { PlayerMovementFullControllable } from './movement/player-movement-full-controllable.js'
import { PlayerMovementVerticalAuto } from './movement/player-movement-vertical-auto.js'
import { PlayerMovementVerticalControllable } from './movement/player-movement-vertical-controllable.js'
import { PlayerBounds } from './player-handlers/player-bounds.js'
import { PlayerShoot } from './player-handlers/player-shoot.js'
import { PlayerCollision } from './player-handlers/player-collision.js'
import { PeaPool } from './pea/pea-pool.js'

export class Player {
  image = document.querySelector('img.player-spritesheet')

  speed = 5

  sourceX = 0
  sourceY = 0

  frameIndex = 0
  framesLength = 8
  fps = 1000 / 12

  peaLoadingDuration = 1000
  peaLoadingTimer = 0

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

    this.initialDestinationX = 25
    this.initialDestinationY = (this.canvasHeight - this.frameHeight) / 2

    this.bananaPool = game.bananaPool

    this.decreaseLife = game.life.decrease
    this.peaPool = new PeaPool(this)
    this.disableAllPeas = this.peaPool.disableAllPeas

    this.ammunition = game.ammunition

    this.isHidden = false
    this.blinkHandler = new BlinkHandler(300, 5, this)

    this.initialize()

    this.bounds = new PlayerBounds(this)
    this.shoot = new PlayerShoot(this)
    this.collision = new PlayerCollision(this)

    this.movementFullControllable = new PlayerMovementFullControllable(this)
    this.movementVerticalAuto = new PlayerMovementVerticalAuto(this)
    this.movementVerticalControllable = new PlayerMovementVerticalControllable(
      this
    )
  }

  render = () => {
    switch (this.game.state) {
      case GameState.level1:
      case GameState.bossLevel1:
        this.peaPool.render()
        break
      default:
        break
    }
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

    if (this.state === PlayerState.peaLoading) {
      this.peaLoadingTimer += this.timestamp.delta
      if (this.peaLoadingTimer >= this.peaLoadingDuration) {
        this.state = PlayerState.normal
        this.peaLoadingDuration = 0
      }
    }

    if (this.game.state === GameState.introLevel1)
      this.movementVerticalAuto.update()

    if (this.game.state === GameState.level1)
      this.movementFullControllable.update()

    if (this.game.state === GameState.bossLevel1)
      this.movementVerticalControllable.update()
  }

  initialize = () => {
    this.destinationX = this.initialDestinationX
    this.destinationY = this.initialDestinationY
    this.state = PlayerState.normal
  }

  loadsAmmunition = () => {
    this.peaLoadingTimer = 0
    this.state = PlayerState.peaLoading
    this.ammunition.increaseValueBy10()
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
  peaLoading: Symbol(3),
})
