import { Key } from '../handlers/input-handler.js'
import { Player, PlayerState } from './player.js'

export class PlayerShoot {
  shootStateDuration = 200
  startShootTimeStamp = 0

  /**
   * @param {Player} player
   */
  constructor(player) {
    this.player = player
  }

  update() {
    if (
      this.player.inputKeys.has(Key.Space) &&
      this.player.state === PlayerState.normal
    ) {
      this.player.peaPool.shoot(
        this.player.destinationX,
        this.player.destinationY
      )
      this.player.state = PlayerState.shoot
      this.startShootTimeStamp = this.player.timestamp.current
    }

    if (
      this.player.state === PlayerState.shoot &&
      this.player.timestamp.current - this.startShootTimeStamp >=
        this.shootStateDuration
    )
      this.player.state = PlayerState.normal
  }
}
