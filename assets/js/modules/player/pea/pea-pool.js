import { Pea } from './pea.js'
import { BananaState } from '../../banana-skin/banana.js'
import { Player } from '../player.js'
import { GameState } from '../../game.js'
import { BananaBossState } from '../../banana-boss.js'

export class PeaPool {
  /** @type {Pea[]} */
  peas = []

  /**
   * @param {Player} player
   */
  constructor(player) {
    this.game = player.game
    this.bananas = player.bananaPool.bananas
    this.bananaBoss = this.game.bananaBoss
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
          if (this.game.state === GameState.bossLevel1) {
            if (
              pea.destinationX >
                this.bananaBoss.destinationX +
                  this.bananaBoss.destinationWidth ||
              pea.destinationX + pea.frameWidth - 20 <
                this.bananaBoss.destinationX ||
              pea.destinationY >
                this.bananaBoss.destinationY +
                  this.bananaBoss.destinationHeight ||
              pea.destinationY + pea.frameHeight < this.bananaBoss.destinationY
            )
              continue
            else {
              pea.isActive = false
              if (this.bananaBoss.state === BananaBossState.normal)
                this.bananaBoss.state = BananaBossState.touched
            }
          }
        } else {
          pea.isActive = false
          banana.state = BananaState.killed
          if (this.game.state === GameState.level1) this.increaseScore(1)
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
