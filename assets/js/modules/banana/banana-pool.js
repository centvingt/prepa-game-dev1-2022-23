import { Banana } from './banana.js'
import { Game, GameState } from '../game.js'

export class BananaPool {
  /** @type {Banana[]} */
  bananas = []
  timer = 0
  counter = 0

  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game
    this.timestamp = this.game.timestamp
    this.resetTimer()
  }

  render() {
    switch (this.game.state) {
      case GameState.introLevel1:
        if (
          this.game.bananaBoss.destinationX ===
            this.game.bananaBoss.finalDestinationX &&
          this.bananas.filter((b) => b.isActive).length < 12
        ) {
          if (this.timer >= this.nextBananaTime) {
            this.activateNewBanana()
            this.resetTimer()
          } else {
            this.timer += this.timestamp.delta
          }
        }
        break
      case GameState.level1:
        if (this.timer >= this.nextBananaTime) {
          this.activateNewBanana()
          this.resetTimer()
        } else {
          this.timer += this.timestamp.delta
        }

        break
      default:
        break
    }

    for (const banana of this.bananas.filter((b) => b.isActive)) {
      banana.render()
    }
  }

  resetTimer = () => {
    this.timer = 0
    switch (this.game.state) {
      case GameState.introLevel1:
        this.nextBananaTime = 1000
        this.angle = 90
        break
      case GameState.level1:
        this.nextBananaTime = Math.random() * 500 + 1500
        break
      default:
        break
    }
  }

  activateNewBanana = () => {
    const banana = this.bananas.find((b) => !b.isActive)
    if (banana) banana.initialize()
    else this.bananas.push(new Banana(this.game))
  }

  disableAllBananas = () => {
    for (const banana of this.bananas) banana.isActive = false
  }
}
