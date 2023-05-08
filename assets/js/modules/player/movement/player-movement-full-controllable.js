import { Key } from '../../handlers/input-handler.js'
import { Player } from '../player.js'

export class PlayerMovementFullControllable {
  /**
   * @param {Player} player
   */
  constructor(player) {
    this.player = player
  }
  update() {
    if (this.player.inputKeys.has(Key.ArrowDown))
      this.player.destinationY += this.player.speed
    if (this.player.inputKeys.has(Key.ArrowUp))
      this.player.destinationY -= this.player.speed
    if (this.player.inputKeys.has(Key.ArrowLeft))
      this.player.destinationX -= this.player.speed
    if (this.player.inputKeys.has(Key.ArrowRight))
      this.player.destinationX += this.player.speed

    this.player.bounds.update()
    this.player.shoot.update()
    this.player.collision.update()
  }
}
