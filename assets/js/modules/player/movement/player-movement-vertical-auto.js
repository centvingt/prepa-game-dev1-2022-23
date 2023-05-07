import { Player } from '../player.js'

export class PlayerMovementVerticalAuto {
  speedFactor = 1

  /**
   * @param {Player} player
   */
  constructor(player) {
    this.player = player
    this.maxDestinationY =
      this.player.canvasHeight -
      this.player.initialDestinationX -
      this.player.frameHeight
  }

  update() {
    this.player.destinationX = this.player.initialDestinationX

    this.player.destinationY += this.player.speed * 0.75 * this.speedFactor

    if (this.player.destinationY <= this.player.initialDestinationX) {
      this.player.destinationY = this.player.initialDestinationX
      this.speedFactor *= -1
    }
    if (this.player.destinationY >= this.maxDestinationY) {
      this.player.destinationY = this.maxDestinationY
      this.speedFactor *= -1
    }
  }
}
