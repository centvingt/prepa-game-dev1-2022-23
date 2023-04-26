import { Pea } from './pea.js'
import { Game } from './game.js'

export class PeaPool {
  /** @type {Pea[]} */
  peas = []

  lastTimestamp = 0
  minInterval = 300

  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game
  }

  /**
   * Animer les bananes présentes à l’écran
   * @param {number} timeStamp
   * @param {number} deltaTime
   */
  render(timeStamp, deltaTime) {
    for (const pea of this.peas.filter((p) => p.isActive)) {
      pea.draw()
      pea.update(timeStamp, deltaTime)
    }
  }

  /**
   * @param {number} timesStamp
   * @param {number} playerX
   * @param {number} playerY
   * @returns {void}
   */
  shoot = (timesStamp, playerX, playerY) => {
    if (timesStamp - this.lastTimestamp < this.minInterval) {
      this.lastTimestamp = timesStamp
      return
    }

    this.lastTimestamp = timesStamp

    const pea = this.peas.find((p) => !p.isActive)
    if (pea) pea.initialize(playerX, playerY)
    else this.peas.push(new Pea(this.game, playerX, playerY))
  }

  disableAllPeas = () => {
    for (const pea of this.peas) pea.isActive = false
  }
}
