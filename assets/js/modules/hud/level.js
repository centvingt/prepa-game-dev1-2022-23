import { Game, GameState } from '../game.js'
import { HudDisplayHandler } from '../handlers/hud-display-handler.js'
import { PlayerState } from '../player/player.js'

export class Level {
  /** @type {number} */ #_value
  /** @type {number} */ #_maxValue

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
    this.maxValue = 0

    this.game = game
    this.gameState = game.state
  }

  /**
   * @param {number} newValue
   */
  set value(newValue) {
    if (newValue < 0) newValue = 0
    this.rangeInput.value = newValue
    if (newValue >= this.maxValue) {
      switch (this.game.state) {
        case GameState.level1:
          this.game.state = GameState.bossLevel1
          break
        case GameState.bossLevel1:
          this.game.state = GameState.win
          break
        default:
          break
      }
    }
    this.#_value = newValue
  }
  get value() {
    return this.#_value
  }

  /**
   * @param {GameState} newValue
   */
  set gameState(newValue) {
    switch (newValue) {
      case GameState.level1:
        this.value = 0
        this.maxValue = 20
        this.fromLabel.innerText = 'NIV 0'
        this.toLabel.innerText = 'NIV 1'
        break
      case GameState.bossLevel1:
        this.value = 0
        this.maxValue = 10
        this.fromLabel.innerText = 'NIV 1'
        this.toLabel.innerText = 'BOSS'
        break
      default:
        break
    }
    this.hudDisplayHandler.setDisplay(newValue)
    this.#_gameState = newValue
  }
  get gameState() {
    return this.#_gameState
  }

  /**
   * @param {number} newValue
   */
  set maxValue(newValue) {
    this.rangeInput.max = newValue
    this.#_maxValue = newValue
  }
  get maxValue() {
    return this.#_maxValue
  }

  increaseValueBy = (number) => {
    this.value += number
  }
}
