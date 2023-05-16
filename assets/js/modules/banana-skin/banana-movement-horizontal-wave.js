import { Banana } from './banana.js'

export class BananaMovementHorizontalWave {
  /**
   * @param {Banana} banana
   */
  constructor(banana) {
    this.banana = banana

    this.banana.destinationX = this.banana.gameWidth
    this.banana.destinationY =
      Math.random() * (this.banana.gameHeight - this.banana.destinationHeight)

    const scaleFactor = Math.random() * 0.3 + 0.85
    this.banana.destinationWidth = this.banana.frameWidth * scaleFactor
    this.banana.destinationHeight = this.banana.frameHeight * scaleFactor

    this.banana.speed = Math.random() * 50 + 100

    this.angle = Math.random() * 2 // Nombre aléatoire entre 0 et 2
    this.angleSpeed = Math.random() * 0.2 // Nombre compris entre 0 et 0.2
    this.curve = Math.random() * 7 // Nombre aléatoire compris entre 0 et 7
  }

  update() {
    this.banana.destinationX -=
      (this.banana.timestamp.delta * this.banana.speed) / 1000

    // Plus grande amplitude sur l’axe y
    this.banana.destinationY += this.curve * Math.sin(this.angle)
    this.angle += this.angleSpeed

    while (
      this.banana.destinationY <= 0 ||
      this.banana.destinationY >= this.gameHeight
    )
      this.angle += this.angleSpeed
  }
}
