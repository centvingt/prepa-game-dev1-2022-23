import { Pea } from './pea.js'
import { BananaState } from '../../banana-skin/banana.js'
import { Player } from '../player.js'

export class PeaPool {
  /** @type {Pea[]} */
  peas = []

  /**
   * @param {Player} player
   */
  constructor(player) {
    this.game = player.game
    this.bananas = player.bananaPool.bananas
    this.increaseScore = this.game.level.increaseValueBy
  }

  render() {
    for (const pea of this.peas.filter((p) => p.isActive)) {
      for (const banana of this.bananas) {
        if (
          !banana.isActive ||
          banana.state === BananaState.killed ||
          pea.destinationX > banana.destinationX + banana.destinationWidth ||
          pea.destinationX + pea.frameWidth - 20 < banana.destinationX ||
          pea.destinationY > banana.destinationY + banana.destinationHeight ||
          pea.destinationY + pea.frameHeight < banana.destinationY
        ) {
          continue
        } else {
          pea.isActive = false
          banana.state = BananaState.killed
          this.increaseScore(1)
        }
      }

      pea.render()
    }
  }

  /**
   * @param {number} playerX
   * @param {number} playerY
   * @returns {void}
   */
  shoot = () => {
    const pea = this.peas.find((p) => !p.isActive)
    if (pea) pea.initialize()
    else this.peas.push(new Pea(this.game))
  }

  disableAllPeas = () => {
    for (const pea of this.peas) pea.isActive = false
  }
}
