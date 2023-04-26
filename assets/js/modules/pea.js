import { Game } from './game.js'

export class Pea {
  sourceX = 0
  sourceY = 0

  frameIndex = 0
  framesLength = 8
  fps = 1000 / 12

  speedX = 150

  /**
   * Description
   * @param {Game} game
   * @param {number} playerX
   * @param {number} playerY
   */
  constructor(game, playerX, playerY) {
    this.gameWidth = game.width
    this.ctx = game.ctx
    this.frameWidth = 48
    this.frameHeight = 16.5
    this.image = new Image()
    this.image.src = './assets/img/pea-spritesheet.png'

    this.initialize(playerX, playerY)
  }

  /**
   * Description
   * @param {CanvasRenderingContext2D} ctx
   */
  draw() {
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

  /**
   * @param {number} timeStamp
   * @param {number} deltaTime
   */
  update(timeStamp, deltaTime) {
    this.frameIndex = Math.floor(timeStamp / this.fps) % this.framesLength

    this.sourceX = this.frameIndex * this.frameWidth

    this.destinationX += (deltaTime * this.speedX) / 1000

    if (this.destinationX > this.gameWidth) this.isActive = false
  }

  initialize(playerX, playerY) {
    this.isActive = true
    this.destinationX = playerX + 40
    this.destinationY = playerY + 24
  }
}
