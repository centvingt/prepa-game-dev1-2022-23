import { Game, GameState } from '../game.js'
import { HudDisplayHandler } from '../handlers/hud-display-handler.js'

export class Level {
  #_value = 0

  /** @type {GameState} */
  #_gameState

  /**
   * @param {Game} game
   */
  constructor(game) {
    /** @type {HTMLDivElement} */
    this.ui = document.querySelector('.level')

    /** @type {HTMLSpanElement} */ this.toLabel = document.querySelector(
      '.level>:first-child'
    )

    /** @type {HTMLSpanElement} */ this.fromLabel =
      document.querySelector('.level>:last-child')

    /** @type {HTMLInputElement} */ this.rangeInput =
      document.querySelector('.level>input')

    this.hudDisplayHandler = new HudDisplayHandler(this.ui)

    this.value = 0
    this.maxValue = 50

    this.gameState = game.state
  }

  /**
   * @param {number} newValue
   */
  set value(newValue) {
    if (newValue < 0) newValue = 0
    this.rangeInput.value = newValue
    if (newValue >= this.maxValue) this.gameState = GameState.bossLevel1
    this.#_value = newValue
  }
  get value() {
    return this.#_value
  }

  /**
   * @param {GameState} newValue
   */
  set gameState(newValue) {
    this.hudDisplayHandler.setDisplay(newValue)
    this.#_gameState = newValue
  }
  get gameState() {
    return this.#_gameState
  }

  increaseValueBy = (number) => {
    this.value += number
  }
}
