import { Game } from './game.js'

export class GlitchOverlay {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.glitchLife1 = new Glitch(game, 1, 202)
    this.glitchLife2 = new Glitch(game, 2, 80)
    this.glitchLife3 = new Glitch(game, 3, 322)

    this.life = game.life
  }

  render = () => {
    this.glitchLife3.render()
    if (this.life.value < 3) this.glitchLife2.render()
    if (this.life.value < 2) this.glitchLife1.render()
  }
}

class Glitch {
  frameWidth = 480
  frameHeight = 360
  frameX = 0
  frameY = 0
  frameIndex = 0
  fps = 1000 / 12

  /**
   *
   * @param {Game} game
   * @param {numberOfLifes} number
   * @param {framesLength} number
   */
  constructor(game, numberOfLifes, framesLength) {
    this.image = new Image()
    this.image.src = `./assets/img/glitch-life-${numberOfLifes}.png`

    this.ctx = game.ctx
    this.currentTimeStamp = game.currentTimeStamp
    this.framesLength = framesLength
  }

  render = () => {
    this.draw()
    this.update()
  }

  draw = () => {
    this.ctx.drawImage(
      this.image,
      this.frameX,
      this.frameY,
      this.frameWidth,
      this.frameHeight,
      0,
      0,
      this.frameWidth,
      this.frameHeight
    )
  }

  update = () => {
    this.frameIndex =
      Math.floor(this.currentTimeStamp / this.fps) % this.framesLength

    const xIndex = this.frameIndex % 10
    const yIndex = Math.floor(this.frameIndex / 10)

    this.frameX = xIndex * this.frameWidth
    this.frameY = yIndex * this.frameHeight
  }
}
