import { Game, GameState } from '../game.js'
import { HudDisplayHandler } from '../handlers/hud-display-handler.js'

export class Life {
  /** @type {GameState} */
  #_gameState

  /**
   * @param {Game} game
   */
  constructor(game) {
    this.value = 3

    /** @type {HTMLDivElement} */
    this.ui = document.querySelector('.life')

    /** @type {HTMLSpanElement} */ this.label =
      document.querySelector('.life>span')

    /** @type {HTMLImageElement} */ this.img =
      document.querySelector('.life>img')

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
    if (newValue === GameState.opening) this.value = 3
    this.setUi()
    this.#_gameState = newValue
  }
  get gameState() {
    return this.#_gameState
  }

  decrease = () => {
    this.value--
    if (this.value < 1) {
      this.value = 0
      this.game.state = GameState.lost
    }

    this.setUi()
    this.ui.style.opacity = 0
    setTimeout(() => (this.ui.style.opacity = 1), 300)
  }
  setUi = () => {
    this.label.innerText = this.value
    this.img.src = `./assets/img/hud-life-${this.value}.svg`
  }
}
