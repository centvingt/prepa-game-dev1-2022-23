import { Banana } from './banana.js'

export class BananaMovementCircularAroundBoss {
  static angle = 0
  static instancesCounter = 0
  index = 0
  angleSpeed = 360 / 12
  cadence = 1000

  /**
   * @param {Banana} banana
   */
  constructor(banana) {
    this.banana = banana

    const game = banana.game
    this.gameWidth = game.canvas.width
    this.gameHeight = game.canvas.height
    this.bananaBoss = game.bananaBoss
    this.timestamp = game.timestamp
    this.bananas = game.bananaPool.bananas

    this.radius = this.bananaBoss.frameWidth / 2 + 20

    this.centerX =
      this.bananaBoss.finalDestinationX + this.bananaBoss.frameWidth / 2 - 30
    this.centerY =
      this.bananaBoss.destinationY + this.bananaBoss.frameHeight / 2 - 20

    this.startDestinationX = this.centerX + this.radius
  }

  update() {
    if (!this.start) {
      if (this.bananaBoss.destinationX !== this.bananaBoss.finalDestinationX)
        return

      const activeBananas = this.bananas.filter((b) => b.isActive)
      if (
        this.index !== 0 &&
        !activeBananas[this.index - 1].movementCircularAroundBoss.start
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

    const angle =
      BananaMovementCircularAroundBoss.angle - this.angleSpeed * this.index
    this.banana.destinationX =
      this.radius * Math.sin((angle * Math.PI) / 180) + this.centerX
    this.banana.destinationY =
      this.radius * Math.cos((angle * Math.PI) / 180) + this.centerY

    if (this.index === 0)
      BananaMovementCircularAroundBoss.angle +=
        (this.timestamp.delta * this.angleSpeed) / this.cadence
  }

  initialize() {
    this.start = false

    this.banana.destinationX = this.gameWidth
    this.banana.destinationY = (this.gameHeight - this.banana.frameHeight) / 2

    // 60px à parcourir en 1s pour rejoindre le cercle
    this.banana.speed = 60

    if (BananaMovementCircularAroundBoss.instancesCounter === 0)
      BananaMovementCircularAroundBoss.angle = 90
    this.index = BananaMovementCircularAroundBoss.instancesCounter++
  }
}
