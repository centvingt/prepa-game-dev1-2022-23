import { Banana, BananaState } from './banana.js'

export class BananaMovementHorizontalLinear {
  /**
   * @param {Banana} banana
   */
  constructor(banana) {
    this.banana = banana

    this.banana.destinationX = this.banana.gameWidth
    this.banana.destinationY =
      Math.random() * (this.banana.gameHeight - this.banana.destinationHeight)

    this.banana.speed = Math.random() * 50 + 100
  }

  update() {
    this.banana.destinationX -=
      (this.banana.timestamp.delta * this.banana.speed) / 1000
  }
}
