import { Key } from '../handlers/input-handler.js'
import { PlayerShoot } from './player-shoot.js'
import { Player, PlayerState } from './player.js'

export class PlayerMovementPatternControllable {
  /**
   * @param {Player} player
   */
  constructor(player) {
    this.player = player
    this.shoot = new PlayerShoot(player)
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
