import { CannedPeas } from './canned-peas.js'
import { Game } from '../game.js'

export class CannedPeasPool {
  /**
   * @param {Game} game
   */
  constructor(game) {
    /** @type {CannedPeas[]} */
    this.cannedPeasArray = []

    this.game = game
    this.timestamp = this.game.timestamp

    this.resetTimer()
  }

  render() {
    if (this.timer >= this.nextTime) {
      this.activateNewCannedPeas()
      this.resetTimer()
    } else {
      this.timer += this.timestamp.delta
    }

    for (const activeCp of this.cannedPeasArray.filter((cp) => cp.isActive))
      activeCp.render()
  }

  resetTimer = () => {
    this.timer = 0
    this.nextTime = Math.random() * 7000 + 8000
  }

  activateNewCannedPeas = () => {
    let cannedPeas = this.cannedPeasArray.find((b) => !b.isActive)
    if (cannedPeas) cannedPeas.initialize()
    else {
      cannedPeas = new CannedPeas(this.game)
      this.cannedPeasArray.push(cannedPeas)
    }

    const player = this.game.player

    if (
      cannedPeas.destinationX >
        player.destinationX + player.destinationWidth - 10 ||
      cannedPeas.destinationX + cannedPeas.frameWidth - 10 <
        player.destinationX ||
      cannedPeas.destinationY >
        player.destinationY + player.destinationHeight - 10 ||
      cannedPeas.destinationY + cannedPeas.frameHeight - 10 <
        player.destinationY
    )
      return
    else {
      cannedPeas.isActive = false
      this.activateNewCannedPeas()
    }
  }

  disableAllCannedPeas = () => {
    for (const cannedPeas of this.cannedPeasArray) cannedPeas.isActive = false
  }
}
