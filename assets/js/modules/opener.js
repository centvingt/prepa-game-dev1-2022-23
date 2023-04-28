import { BlinkHandler } from './blink-handler.js'
import { Game } from './game.js'

export class Opener {
  blinkHandler = new BlinkHandler(1000, Infinity)

  /**
   * @param {Game} game
   */
  constructor(game) {
    /** @type {CanvasRenderingContext2D} */ this.ctx = game.ctx
    const canvasWidth = game.canvas.width
    const canvasHeight = game.canvas.height

    this.image = new Image()
    this.image.src = './assets/img/title.png'
    const imageWidth = 372
    const imageHeight = 196

    this.imageX = (canvasWidth - imageWidth) / 2
    this.imageY = (canvasHeight - (imageHeight + 36 + 24 + 24 - 8)) / 2

    this.textLine1 = `PRESSER ${
      game.deviceIsMobile ? 'LE BOUTON A' : 'LA TOUCHE ENTRÉE'
    }`
    this.textLine2 = 'POUR COMMENCER'

    this.textX = canvasWidth / 2
    this.textLine1Y = this.imageY + imageHeight + 36
    this.textLine2Y = this.textLine1Y + 24
  }

  render = (timeStamp) => {
    this.draw()
    this.update(timeStamp)
  }

  draw = () => {
    this.ctx.drawImage(this.image, this.imageX, this.imageY)

    if (this.blinkHandler.isHidden) {
      this.ctx.font = '24px vcr'
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = 'white'
      this.ctx.fillText(this.textLine1, this.textX, this.textLine1Y)
      this.ctx.fillText(this.textLine2, this.textX, this.textLine2Y)
    }
  }

  update = (timesStamp) => {
    this.blinkHandler.checkCurrentBlink(timesStamp)
  }
}
