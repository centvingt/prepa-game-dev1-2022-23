import { Banana } from './banana.js'

export class BananaMovementCircularAroundBoss {
  angle = 90
  angleSpeed = 360 / 13

  /**
   * @param {Banana} banana
   */
  constructor(banana) {
    this.banana = banana
    this.game = banana.game
    this.bananaBoss = banana.game.bananaBoss

    this.radius = this.bananaBoss.frameWidth / 2 + 20

    this.centerX =
      this.bananaBoss.finalDestinationX + this.bananaBoss.frameWidth / 2 - 30
    this.centerY =
      this.bananaBoss.destinationY + this.bananaBoss.frameHeight / 2 - 20

    this.startDestinationX = this.centerX + this.radius
  }

  update() {
    if (!this.start) {
      this.banana.destinationX -=
        (this.banana.timestamp.delta * this.banana.speed) / 1000
      if (this.banana.destinationX <= this.startDestinationX) {
        this.banana.destinationX = this.startDestinationX
        this.start = true
      }
      return
    }

    this.banana.destinationX =
      this.radius * Math.sin((this.angle * Math.PI) / 180) + this.centerX
    this.banana.destinationY =
      this.radius * Math.cos((this.angle * Math.PI) / 180) + this.centerY

    this.angle += (this.banana.timestamp.delta * this.angleSpeed) / 1000
  }

  initialize() {
    this.start = false

    this.banana.destinationX = this.banana.gameWidth
    this.banana.destinationY =
      (this.game.canvas.height - this.banana.frameHeight) / 2

    // 60px à parcourir en 1s pour rejoindre le cercle
    this.banana.speed = 60
  }
}
