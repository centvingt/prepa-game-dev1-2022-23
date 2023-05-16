import { Banana } from './banana.js'
import { Game, GameState } from '../game.js'
import { BananaMovementCircularAroundBoss } from './banana-movement-circular-around-boss.js'
import { BananaMovementHorizontalLinear } from './banana-movement-Horizontal-linear.js'
import { BananaMovementHorizontalWave } from './banana-movement-horizontal-wave.js'

export class BananaPool {
  /** @type {GameState} */
  #_gameState

  /**
   * @param {Game} game
   */
  constructor(game) {
    /** @type {Banana[]} */
    this.bananas = []

    /** @type {Banana[]} */
    this.circularBananas = []

    this.timer = 0
    this.angle = 90

    this.game = game
    this.gameState = game.state
    this.timestamp = this.game.timestamp
    this.resetTimer()
  }

  /**
   * @param {GameState} newValue
   */
  set gameState(newValue) {
    switch (newValue) {
      case GameState.introLevel1:
      case GameState.bossLevel1:
        this.angle = 90
        this.circularBananas = []
        for (let i = 0; i < 12; i++)
          this.circularBananas = [
            ...this.circularBananas,
            this.activateNewBanana(BananaMovementCircularAroundBoss, i),
          ]
        break
      default:
        break
    }
    this.#_gameState = newValue
  }
  get gameState() {
    return this.#_gameState
  }

  render() {
    switch (this.game.state) {
      case GameState.level1:
        if (this.timer >= this.nextBananaTime) {
          this.activateNewBanana(BananaMovementHorizontalLinear)
          this.resetTimer()
        } else {
          this.timer += this.timestamp.delta
        }
        break
      case GameState.bossLevel1:
      case GameState.level2:
        if (
          (this.game.state === GameState.bossLevel1 ||
            this.game.state === GameState.level2) &&
          this.angle < 400
        )
          break
        if (this.timer >= this.nextBananaTime) {
          let movement = BananaMovementHorizontalLinear
          if (Math.random() > 0.3) movement = BananaMovementHorizontalWave
          this.activateNewBanana(movement)
          this.resetTimer()
        } else {
          this.timer += this.timestamp.delta
        }
        break
      case GameState.bossLevel2:
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
    this.nextBananaTime = Math.random() * 500 + 1500
  }

  activateNewBanana = (movement, index) => {
    let banana = this.bananas.find((b) => !b.isActive)
    if (banana) banana.initialize(movement, index)
    else {
      banana = new Banana(this.game, movement, index)
      this.bananas.push(banana)
    }
    return banana
  }

  disableAllBananas = () => {
    for (const banana of this.bananas) banana.isActive = false
  }
}
