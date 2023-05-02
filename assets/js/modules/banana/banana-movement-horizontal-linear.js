import { Banana, BananaState } from './banana.js'

export class BananaMovementHorizontalLinear {
  /**
   * @param {Banana} banana
   */
  constructor(banana) {
    this.banana = banana
  }

  update() {
    this.banana.destinationX -=
      (this.banana.timestamp.delta * this.banana.speed) / 1000

    if (this.banana.state === BananaState.killed)
      this.banana.isActive = this.banana.blinkHandler.checkCurrentBlink()

    this.banana.frameY = this.banana.frameHeight * this.banana.state

    if (this.banana.destinationX < -this.banana.destinationWidth) {
      this.banana.isActive = false
      this.banana.increaseScore(-2)
    }
  }

  initialize() {
    this.banana.destinationX = this.banana.gameWidth
    this.banana.destinationY =
      Math.random() * (this.banana.gameHeight - this.banana.destinationHeight)

    this.banana.speed = Math.random() * 50 + 100
  }
}
