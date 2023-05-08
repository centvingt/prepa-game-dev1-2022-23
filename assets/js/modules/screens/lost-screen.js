import { BlinkHandler } from '../handlers/blink-handler.js'
import { Game } from '../game.js'

export class LostScreen {
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

    this.title = 'C’EST PERDU !'
    this.textLine1 = 'LES BANANES TUEUSES'
    this.textLine2 = 'ONT EU TA PEAU CETTE FOIS-CI,'
    this.textLine3 = 'MAIS RETENTE TA CHANCE'
    this.textLine4 = 'ET TU FINIRAS BIEN'
    this.textLine5 = 'PAR GAGNER !'

    this.textX = canvasWidth / 2
    this.titleY = (canvasHeight - 24 * 4) / 2 + 8
    this.textLine1Y = this.titleY + 36
    this.textLine2Y = this.textLine1Y + 24
    this.textLine3Y = this.textLine2Y + 24
    this.textLine4Y = this.textLine3Y + 24
    this.textLine5Y = this.textLine4Y + 24
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
    this.ctx.fillText(this.textLine5, this.textX, this.textLine5Y)
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
