import { BlinkHandler } from './blink-handler.js'
import { Game } from './game.js'
import { Key } from './key.js'

export class Player {
  ammunitionLoading = true
  speed = 3

  sourceX = 0
  sourceY = 0

  frameIndex = 0
  framesLength = 8
  fps = 1000 / 12

  shootStateDuration = 200
  startShootTimeStamp = 0

  /**
   * @param {Game} game
   */
  constructor(game) {
    this.ctx = game.ctx
    this.timestamp = game.timestamp
    this.inputKeys = game.inputHandler.keys

    this.image = new Image()
    this.image.src = './assets/img/player-spritesheet.png'

    this.canvasWidth = game.canvas.width
    this.canvasHeight = game.canvas.height

    this.frameWidth = 94
    this.frameHeight = 72
    this.maxDestinationX = this.canvasWidth - this.frameWidth
    this.maxDestinationY = this.canvasHeight - this.frameHeight

    this.bananaPool = game.bananaPool

    this.decreaseLife = game.life.decrease
    this.shoot = game.peaPool.shoot
    this.disableAllPeas = game.peaPool.disableAllPeas

    this.isHidden = false
    this.blinkHandler = new BlinkHandler(300, 5, this)

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

    if (this.inputKeys.has(Key.ArrowDown)) this.destinationY += this.speed
    if (this.inputKeys.has(Key.ArrowUp)) this.destinationY -= this.speed
    if (this.inputKeys.has(Key.ArrowLeft)) this.destinationX -= this.speed
    if (this.inputKeys.has(Key.ArrowRight)) this.destinationX += this.speed

    if (this.destinationX < 0) this.destinationX = 0
    if (this.destinationX > this.maxDestinationX)
      this.destinationX = this.maxDestinationX
    if (this.destinationY < 0) this.destinationY = 0
    if (this.destinationY > this.maxDestinationY)
      this.destinationY = this.maxDestinationY

    if (this.inputKeys.has(Key.Space) && this.state === PlayerState.normal) {
      this.shoot(this.destinationX, this.destinationY)
      this.state = PlayerState.shoot
      this.startShootTimeStamp = this.timestamp.current
    }

    if (
      this.state === PlayerState.shoot &&
      this.timestamp.current - this.startShootTimeStamp >=
        this.shootStateDuration
    )
      this.state = PlayerState.normal

    if (this.state === PlayerState.normal && this.collisionIsDetected())
      this.state = PlayerState.collision
    if (
      this.state === PlayerState.collision &&
      !this.blinkHandler.checkCurrentBlink()
    )
      this.state = PlayerState.normal
  }

  /**
   * Retourne true si le joueur percute une banane
   * @returns {boolean}
   */
  collisionIsDetected = () => {
    for (const banana of this.bananaPool.bananas) {
      if (
        !banana.isActive ||
        this.destinationX >
          banana.destinationX + banana.destinationWidth - 20 ||
        this.destinationX + this.frameWidth - 20 < banana.destinationX ||
        this.destinationY >
          banana.destinationY + banana.destinationHeight - 20 ||
        this.destinationY + this.frameHeight - 20 < banana.destinationY
      )
        continue
      else {
        banana.isActive = false
        this.disableAllPeas()
        this.decreaseLife()
        return true
      }
    }

    return false
  }

  initialize = () => {
    this.destinationX = 25
    this.destinationY = (this.canvasHeight - this.frameHeight) / 2
    this.state = PlayerState.normal
    console.log(
      'assets/js/modules/player.js > this.destinationY >',
      this.destinationY
    )
  }

  /**
   * Masquer l’instance
   * @param {boolean} boolean
   * @returns {void}
   */
  hide = (boolean) => (this.isHidden = boolean)
}

const PlayerState = Object.freeze({
  normal: Symbol(0),
  shoot: Symbol(1),
  collision: Symbol(2),
  peaLoad: Symbol(3),
})
