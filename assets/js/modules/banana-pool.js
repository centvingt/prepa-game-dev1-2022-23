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
    if (this.bananaTimer > this.nextBananaTime) {
      this.activateNewBanana()
      this.resetTimer()
    } else {
      this.bananaTimer += deltaTime
    }

    for (const banana of this.bananas.filter((b) => b.isActive)) {
      banana.draw()
      banana.update(timeStamp, deltaTime)
    }
  }

  resetTimer = () => {
    this.bananaTimer = 0
    this.nextBananaTime = Math.random() * 500 + 1500
  }

  activateNewBanana = () => {
    // const index = this.bananas.findIndex((b) => !b.isActive)
    // if (index === -1) this.bananas.push(new Banana(this.game))
    // else this.bananas[index].initialize()

    const banana = this.bananas.find((b) => !b.isActive)
    if (banana) banana.initialize()
    else this.bananas.push(new Banana(this.game))
  }
}
