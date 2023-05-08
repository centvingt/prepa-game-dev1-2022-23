import { GameState } from '../game.js'

export class HudDisplayHandler {
  constructor(ui) {
    /** @type {HTMLElement} */
    this.ui = ui
  }

  /**
   * @param {GameState} gameState
   */
  setDisplay(gameState) {
    switch (gameState) {
      case GameState.opening:
      case GameState.introLevel1:
        this.ui.style.opacity = 0
        break
      case GameState.level1:
        this.ui.style.opacity = 1
        break
      default:
        break
    }
  }
}
