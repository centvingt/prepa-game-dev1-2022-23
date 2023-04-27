import { Life } from './life.js'

export class GlitchOverlay {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Life} life
   */
  constructor(ctx, life) {
    this.glitchLife1 = new Glitch(ctx, 1, 202)
    this.glitchLife2 = new Glitch(ctx, 2, 80)
    this.glitchLife3 = new Glitch(ctx, 3, 322)

    this.life = life
  }

  render = (timesStamp) => {
    this.glitchLife3.render(timesStamp)
    if (this.life.value < 3) this.glitchLife2.render(timesStamp)
    if (this.life.value < 2) this.glitchLife1.render(timesStamp)
  }
}

class Glitch {
  frameWidth = 480
  frameHeight = 360
  frameX = 0
  frameY = 0
  frameIndex = 0
  fps = 1000 / 12

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {numberOfLifes} number
   * @param {framesLength} number
   */
  constructor(ctx, numberOfLifes, framesLength) {
    this.image = new Image()
    this.image.src = `./assets/img/glitch-life-${numberOfLifes}.png`

    this.clipImage = new Image()
    this.clipImage.src = './assets/img/glitch-clip.svg'

    this.ctx = ctx
    this.framesLength = framesLength

    this.offScrCan = document.createElement('canvas')
    const { width, height } = this.ctx.canvas
    this.offScrCan.width = width
    this.offScrCan.height = height
    this.offScrCtxt = this.offScrCan.getContext('2d')
  }

  render = (timesStamp) => {
    this.draw()
    this.update(timesStamp)
  }

  draw = () => {
    this.offScrCtxt.drawImage(this.clipImage, 0, 0)
    this.offScrCtxt.globalCompositeOperation = 'source-in'
    this.offScrCtxt.drawImage(
      this.image,
      this.frameX,
      this.frameY,
      this.frameWidth,
      this.frameHeight,
      0,
      0,
      this.frameWidth,
      this.frameHeight
    )
    this.offScrCtxt.globalCompositeOperation = 'source-over'
    this.ctx.drawImage(this.offScrCan, 0, 0)
  }

  update = (timeStamp) => {
    this.frameIndex = Math.floor(timeStamp / this.fps) % this.framesLength

    const xIndex = this.frameIndex % 10
    const yIndex = Math.floor(this.frameIndex / 10)

    this.frameX = xIndex * this.frameWidth
    this.frameY = yIndex * this.frameHeight
  }
}
