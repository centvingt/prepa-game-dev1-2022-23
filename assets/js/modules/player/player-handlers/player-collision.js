import { CannedPeasState } from '../../canned-peas/canned-peas.js'
import { Player, PlayerState } from '../player.js'

export class PlayerCollision {
  /**
   * @param {Player} player
   */
  constructor(player) {
    this.player = player
    this.cannedPeasArray = player.game.cannedPeasPool.cannedPeasArray
  }
  update() {
    if (this.player.state === PlayerState.normal && this.collisionIsDetected())
      this.player.state = PlayerState.collision
    if (
      this.player.state === PlayerState.collision &&
      !this.player.blinkHandler.checkCurrentBlink()
    )
      this.player.state = PlayerState.normal

    if (
      this.player.state === PlayerState.normal &&
      this.cannedPeasCollisionIsDetected()
    )
      this.player.state = PlayerState.peaLoading
  }

  /**
   * Retourne true si le joueur percute une banane
   * @returns {boolean}
   */
  collisionIsDetected = () => {
    for (const banana of this.player.bananaPool.bananas.filter(
      (b) => b.isActive
    )) {
      if (
        this.player.destinationX >
          banana.destinationX + banana.destinationWidth - 10 ||
        this.player.destinationX + this.player.frameWidth - 10 <
          banana.destinationX ||
        this.player.destinationY >
          banana.destinationY + banana.destinationHeight - 10 ||
        this.player.destinationY + this.player.frameHeight - 10 <
          banana.destinationY
      )
        continue
      banana.isActive = false
      this.player.disableAllPeas()
      this.player.decreaseLife()
      return true
    }

    return false
  }

  cannedPeasCollisionIsDetected = () => {
    if (this.player.state !== PlayerState.normal) return false

    for (const activeCannedPeas of this.cannedPeasArray.filter(
      (cp) => cp.isActive
    )) {
      if (
        activeCannedPeas.state !== CannedPeasState.normal ||
        this.player.destinationX >
          activeCannedPeas.destinationX + activeCannedPeas.frameWidth ||
        this.player.destinationX + this.player.frameWidth <
          activeCannedPeas.destinationX ||
        this.player.destinationY >
          activeCannedPeas.destinationY + activeCannedPeas.frameHeight ||
        this.player.destinationY + this.player.frameHeight <
          activeCannedPeas.destinationY
      )
        continue
      else {
        activeCannedPeas.state = CannedPeasState.disappearance
        this.player.loadsAmmunition()
        return true
      }
    }

    return false
  }
}
