import { Game, GameState } from '../game.js'
import { HudDisplayHandler } from '../handlers/hud-display-handler.js'

export class Ammunition {
  /** @type {GameState} */
  #_gameState

  /**
   * @param {Game} game
   */
  constructor(game) {
    this.value = 0

    /** @type {HTMLDivElement} */
    this.ui = document.querySelector('.ammunition')

    /** @type {HTMLSpanElement} */ this.label =
      document.querySelector('.ammunition>span')

    this.hudDisplayHandler = new HudDisplayHandler(this.ui)

    this.game = game
    this.gameState = game.state
    this.setUi()
  }

  /**
   * @param {GameState} newValue
   */
  set gameState(newValue) {
    this.hudDisplayHandler.setDisplay(newValue)
    if (newValue === GameState.opening) this.value = 0
    this.setUi()
    this.#_gameState = newValue
  }
  get gameState() {
    return this.#_gameState
  }

  decreaseValueBy1 = () => {
    this.value--
    if (this.value < 1) this.value = 0
    this.ui.style.opacity = 0
    setTimeout(() => (this.ui.style.opacity = 1), 300)
    this.setUi()
  }
  increaseValueBy10 = () => {
    this.value += 10
    if (this.value > 9_999) this.value = 9_999
    this.ui.style.opacity = 0
    setTimeout(() => (this.ui.style.opacity = 1), 300)
    this.setUi()
  }
  setUi = () => {
    this.label.innerText = this.value
  }
}
