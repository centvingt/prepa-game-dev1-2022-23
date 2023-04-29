export class BlinkHandler {
  /**
   * @param {number} blinkDuration
   * @param {number} maxBlink
   * @param {{hide: (boolean: boolean) => void}, timestamp: {current: number, last: number, delta: number}} instance
   */
  constructor(blinkDuration, maxBlink, instance) {
    this.blinkDuration = blinkDuration
    this.maxBlink = maxBlink
    this.hide = instance.hide
    this.timestamp = instance.timestamp

    this.reset()
  }

  checkCurrentBlink = () => {
    if (this.lastBlinkTimestamp === 0)
      this.lastBlinkTimestamp = this.timestamp.current

    this.elapsedBlinkTime += this.timestamp.current - this.lastBlinkTimestamp

    const collisionBlink = Math.floor(
      this.elapsedBlinkTime / this.blinkDuration
    )

    this.hide(collisionBlink % 2 === 0)

    this.lastBlinkTimestamp = this.timestamp.current

    if (collisionBlink >= this.maxBlink) {
      this.reset()
      return false
    }

    return true
  }

  reset = () => {
    this.lastBlinkTimestamp = 0
    this.elapsedBlinkTime = 0
    this.instanceIsHidden = false
  }
}
