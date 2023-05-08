import { Player } from '../player.js'

export class PlayerBounds {
  /**
   * @param {Player} player
   */
  constructor(player) {
    this.player = player
  }

  update() {
    if (this.player.destinationX < this.player.canvasBorderLength)
      this.player.destinationX = this.player.canvasBorderLength
    if (this.player.destinationX > this.player.maxDestinationX)
      this.player.destinationX = this.player.maxDestinationX
    if (this.player.destinationY < this.player.canvasBorderLength)
      this.player.destinationY = this.player.canvasBorderLength
    if (this.player.destinationY > this.player.maxDestinationY)
      this.player.destinationY = this.player.maxDestinationY
  }
}
