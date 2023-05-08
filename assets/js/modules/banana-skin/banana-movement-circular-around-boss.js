import { Banana } from './banana.js'

export class BananaMovementCircularAroundBoss {
  static angle = 0
  angleSpeed = 360 / 12
  cadence = 1000

  /**
   * @param {Banana} banana
   */
  constructor(banana) {
    this.banana = banana
    this.index = banana.index

    const game = banana.game

    this.game = game

    this.bananaPool = this.game.bananaPool
    /** @type {Banana[]} */ this.circularBananas =
      game.bananaPool.circularBananas

    this.gameWidth = game.canvas.width
    this.gameHeight = game.canvas.height
    this.bananaBoss = game.bananaBoss
    this.timestamp = game.timestamp

    this.radius = this.bananaBoss.frameWidth / 2 + 20

    this.centerX =
      this.bananaBoss.finalDestinationX + this.bananaBoss.frameWidth / 2 - 30
    this.centerY =
      this.bananaBoss.destinationY + this.bananaBoss.frameHeight / 2 - 20

    this.startDestinationX = this.centerX + this.radius

    this.start = false

    this.banana.destinationX = this.gameWidth
    this.banana.destinationY = (this.gameHeight - this.banana.frameHeight) / 2

    this.banana.speed = this.gameWidth - this.startDestinationX
  }

  update() {
    if (!this.start) {
      if (this.bananaBoss.destinationX !== this.bananaBoss.finalDestinationX)
        return

      if (
        this.index !== 0 &&
        !this.circularBananas[this.index - 1].movement.start
      )
        return

      this.banana.destinationX -=
        (this.timestamp.delta * this.banana.speed) / this.cadence

      if (this.banana.destinationX <= this.startDestinationX) {
        this.banana.destinationX = this.startDestinationX
        this.start = true
      }

      return
    }

    const angle = this.bananaPool.angle - this.angleSpeed * this.index
    this.banana.destinationX =
      this.radius * Math.sin((angle * Math.PI) / 180) + this.centerX
    this.banana.destinationY =
      this.radius * Math.cos((angle * Math.PI) / 180) + this.centerY

    const activeCircularBananas = this.bananaPool.circularBananas.filter(
      (b) => b.isActive
    )
    const activeCircularBananasLength = activeCircularBananas.length
    const angleSpeedFactor = 12 / activeCircularBananasLength

    if (this.banana.index === 0 && this.bananaPool.angle < 360)
      this.bananaPool.angle +=
        (this.timestamp.delta * this.angleSpeed) / this.cadence
    if (this.bananaPool.angle > 360)
      this.bananaPool.angle +=
        ((this.timestamp.delta * this.angleSpeed) /
          this.cadence /
          activeCircularBananas.length) *
        angleSpeedFactor
  }
}
