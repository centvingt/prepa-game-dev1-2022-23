import { BlinkHandler } from './handlers/blink-handler.js'
import { Game } from './game.js'

export class Opener {
  /**
   * @param {Game} game
   */
  constructor(game) {
    /** @type {CanvasRenderingContext2D} */ this.ctx = game.ctx
    const canvasWidth = game.canvas.width
    const canvasHeight = game.canvas.height

    this.isHidden = false
    this.timestamp = game.timestamp
    this.blinkHandler = new BlinkHandler(1000, Infinity, this)

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

  render = () => {
    this.draw()
    this.update()
  }

  draw = () => {
    this.ctx.drawImage(this.image, this.imageX, this.imageY)

    if (this.isHidden) {
      this.ctx.font = '24px vcr'
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = 'white'
      this.ctx.fillText(this.textLine1, this.textX, this.textLine1Y)
      this.ctx.fillText(this.textLine2, this.textX, this.textLine2Y)
    }
  }

  update = () => {
    this.blinkHandler.checkCurrentBlink()
  }

  /**
   * Masquer l’instance
   * @param {boolean} boolean
   * @returns {void}
   */
  hide = (boolean) => (this.isHidden = boolean)
}
