import { Game } from './game.js'

export class Banana {
  sourceX = 0
  sourceY = 0

  frameIndex = 0
  framesLength = 16
  fps = 1000 / 12

  /**
   * Description
   * @param {Game} game
   */
  constructor(game) {
    this.game = game
    this.ctx = this.game.ctx
    this.width = 49
    this.height = 54
    this.image = new Image()
    this.image.src = './assets/img/banana-spritesheet.png'

    this.initialize()
  }

  /**
   * Description
   * @param {CanvasRenderingContext2D} ctx
   */
  draw() {
    if (this.isAlive) {
      this.ctx.drawImage(
        this.image,
        this.sourceX,
        this.sourceY,
        this.width,
        this.height,
        this.destinationX,
        this.destinationY,
        this.width,
        this.height
      )
    }
  }

  /**
   * @param {number} timeStamp
   * @param {number} deltaTime
   */
  update(timeStamp, deltaTime) {
    if (this.isAlive) {
      this.frameIndex = Math.floor(timeStamp / this.fps) % this.framesLength
      this.sourceX = this.frameIndex * this.width

      this.destinationX -= (deltaTime * this.speed) / 1000

      if (this.destinationX < -this.width) this.isAlive = false

      //   if (this.destinationX < -this.width) this.initialize()
    }
  }
  initialize() {
    this.isAlive = true
    this.destinationX = this.game.width
    this.destinationY = Math.random() * (this.game.height - this.height)
    this.speed = Math.random() * 50 + 100
  }
  start() {
    this.isAlive = true
  }
}
