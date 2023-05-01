import { Game } from '../game.js'

export class Background {
  destinationX = 0
  destinationY = 0
  width = 930
  height = 360
  speed = 100 // px/1000ms

  /**
   *
   * @param {Game} game
   * @param {string} imageSelector
   */
  constructor(game, imageSelector) {
    this.ctx = game.ctx
    this.timestamp = game.timestamp
    this.image = document.querySelector(imageSelector)
  }

  render = () => {
    this.draw()
    this.update()
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.destinationX,
      this.destinationY,
      this.width,
      this.height
    )
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.destinationX + this.width,
      this.destinationY,
      this.width,
      this.height
    )
  }

  update() {
    this.destinationX -= (this.timestamp.delta * this.speed) / 1000
    if (this.destinationX <= 0 - this.width) this.destinationX = 0
  }
}
