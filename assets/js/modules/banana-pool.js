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
    this.resetTimer()
  }

  /**
   * Animer les bananes présentes à l’écran
   * @param {number} timeStamp
   * @param {number} deltaTime
   */
  render(timeStamp, deltaTime) {
    if (this.bananaTime > this.nextBananaTime) {
      this.activateNewBanana()
      this.resetTimer()
    } else {
      this.bananaTimer += deltaTime
    }

    for (const banana of this.bananas) {
      if (banana.isActive) {
        banana.draw()
        banana.update(timeStamp, deltaTime)
      }
    }
  }

  resetTimer = () => {
    this.bananaTime = 0
    this.nextBananaTime = Math.random() * 50 + 500
  }

  activateNewBanana = () => {
    let banana = this.bananas.find((b) => !b.isActive)
    if (!banana) {
      banana = new Banana(this.game)
      this.bananas.push(banana)
    }
    banana.isActive = true
  }
}
