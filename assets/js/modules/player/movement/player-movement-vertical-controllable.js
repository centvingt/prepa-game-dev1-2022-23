import { GameState } from '../../game.js'
import { Key } from '../../handlers/input-handler.js'
import { PlayerShoot } from '../player-shoot.js'
import { Player } from '../player.js'

export class PlayerMovementVerticalControllable {
  /**
   * @param {Player} player
   */
  constructor(player) {
    this.player = player
    this.shoot = new PlayerShoot(player)
  }

  update() {
    this.player.destinationX = this.player.initialDestinationX

    if (this.player.inputKeys.has(Key.ArrowDown))
      this.player.destinationY += this.player.speed
    if (this.player.inputKeys.has(Key.ArrowUp))
      this.player.destinationY -= this.player.speed

    this.player.bounds.update()
    if (
      !this.player.game.state === GameState.bossLevel1 ||
      this.player.game.bananaPool.angle > 360
    )
      this.player.shoot.update()
    this.player.collision.update()
  }
}
