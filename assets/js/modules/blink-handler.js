export class BlinkHandler {
  /**
   *
   * @param {number} blinkDuration
   * @param {number} maxBlink
   */
  constructor(blinkDuration, maxBlink) {
    this.blinkDuration = blinkDuration
    this.maxBlink = maxBlink

    this.reset()
  }

  /**
   * @param {number} timeStamp
   */
  checkCurrentBlink = (timeStamp) => {
    if (this.lastBlinkTimestamp === 0) this.lastBlinkTimestamp = timeStamp

    this.elapsedBlinkTime += timeStamp - this.lastBlinkTimestamp

    const collisionBlink = Math.floor(
      this.elapsedBlinkTime / this.blinkDuration
    )

    this.isHidden = collisionBlink % 2 === 0

    this.lastBlinkTimestamp = timeStamp

    if (collisionBlink >= this.maxBlink) {
      this.reset()
      return false
    }

    return true
  }

  reset = () => {
    this.lastBlinkTimestamp = 0
    this.elapsedBlinkTime = 0
    this.isHidden = false
  }
}
