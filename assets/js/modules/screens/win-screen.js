import { BlinkHandler } from '../handlers/blink-handler.js'
import { Game } from '../game.js'

export class WinScreen {
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

    this.title = 'BRAVO !'
    this.textLine1 = 'C’EST GAGNÉ, TU AS FINI'
    this.textLine2 = 'PAR AVOIR LA PEAU'
    this.textLine3 = 'DE CES SATANÉES'
    this.textLine4 = 'PEAUX DE BANANES !'

    this.textX = canvasWidth / 2
    this.titleY = (canvasHeight - 24 * 4) / 2 + 8
    this.textLine1Y = this.titleY + 36
    this.textLine2Y = this.textLine1Y + 24
    this.textLine3Y = this.textLine2Y + 24
    this.textLine4Y = this.textLine3Y + 24
  }

  render = () => {
    this.draw()
    this.update()
  }

  draw = () => {
    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = 'white'
    if (!this.isHidden) {
      this.ctx.font = '48px vcr'
      this.ctx.fillText(this.title, this.textX, this.titleY)
    }
    this.ctx.font = '24px vcr'
    this.ctx.fillText(this.textLine1, this.textX, this.textLine1Y)
    this.ctx.fillText(this.textLine2, this.textX, this.textLine2Y)
    this.ctx.fillText(this.textLine3, this.textX, this.textLine3Y)
    this.ctx.fillText(this.textLine4, this.textX, this.textLine4Y)
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
