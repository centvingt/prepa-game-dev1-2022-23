export class Background {
  destinationX = 0
  destinationY = 0
  width = 930
  height = 360
  speed = 100 // px/1000ms

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = './assets/img/background-all-930x360.jpg'
  }

  /**
   * @param  {CanvasRenderingContext2D} ctx
   */
  draw() {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.destinationX,
      this.destinationY,
      this.width,
      this.height
    )
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.destinationX + this.width,
      this.destinationY,
      this.width,
      this.height
    )
  }

  /**
   * @param  {number} deltaTime
   */
  update(deltaTime) {
    this.destinationX -= (deltaTime * this.speed) / 1000
    if (this.destinationX <= 0 - this.width) this.destinationX = 0
  }
}
