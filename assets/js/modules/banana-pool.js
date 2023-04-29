import { Banana } from './banana.js'
import { Game } from './game.js'

export class BananaPool {
  /** @type {Banana[]} */
  bananas = []

  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game
    this.timestamp = this.game.timestamp
    this.resetTimer()
  }

  render() {
    if (this.bananaTimer >= this.nextBananaTime) {
      this.activateNewBanana()
      this.resetTimer()
    } else {
      this.bananaTimer += this.timestamp.delta
    }

    for (const banana of this.bananas.filter((b) => b.isActive)) {
      banana.render()
    }
  }

  resetTimer = () => {
    this.bananaTimer = 0
    this.nextBananaTime = Math.random() * 500 + 1500
  }

  activateNewBanana = () => {
    const banana = this.bananas.find((b) => !b.isActive)
    if (banana) banana.initialize()
    else this.bananas.push(new Banana(this.game))
  }
}
