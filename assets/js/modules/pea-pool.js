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
    this.bananas = this.game.bananaPool.bananas
    this.increaseScore = this.game.score.increase
  }

  /**
   * Animer les bananes présentes à l’écran
   * @param {number} timeStamp
   * @param {number} deltaTime
   */
  render(timeStamp, deltaTime) {
    for (const pea of this.peas.filter((p) => p.isActive)) {
      for (const banana of this.bananas) {
        if (
          !banana.isActive ||
          pea.destinationX > banana.destinationX + banana.width ||
          pea.destinationX + pea.frameWidth - 20 < banana.destinationX ||
          pea.destinationY > banana.destinationY + banana.height ||
          pea.destinationY + pea.frameHeight < banana.destinationY
        ) {
          continue
        } else {
          pea.isActive = false
          banana.isActive = false
          this.increaseScore(1)
        }
      }

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
