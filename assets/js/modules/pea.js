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
   */
  constructor(game) {
    this.ctx = game.ctx
    this.player = game.player
    this.timestamp = game.timestamp
    this.gameWidth = game.width

    this.frameWidth = 48
    this.frameHeight = 16.5
    this.image = new Image()
    this.image.src = './assets/img/pea-spritesheet.png'

    this.initialize()
  }

  render = () => {
    this.draw()
    this.update()
  }

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

  update() {
    this.frameIndex =
      Math.floor(this.timestamp.current / this.fps) % this.framesLength

    this.sourceX = this.frameIndex * this.frameWidth

    this.destinationX += (this.timestamp.delta * this.speedX) / 1000

    if (this.destinationX > this.gameWidth) this.isActive = false
  }

  initialize() {
    this.isActive = true
    this.destinationX = this.player.destinationX + 40
    this.destinationY = this.player.destinationY + 24
  }
}
