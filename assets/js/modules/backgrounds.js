import { Background } from './background.js'

export class Backgrounds {
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.ctx = ctx

    const skyBackground = new Background(this.ctx)
    skyBackground.image.src = './assets/img/background-sky-930x360@2x.jpg'
    skyBackground.speed *= 0.2

    const horizonBackground = new Background(this.ctx)
    horizonBackground.image.src =
      './assets/img/background-horizon-930x360@2x.png'
    horizonBackground.speed *= 0.4

    const buildingsBackground = new Background(this.ctx)
    buildingsBackground.image.src =
      './assets/img/background-buildings-930x360@2x.png'
    buildingsBackground.speed *= 0.6

    const cloudsBackground = new Background(this.ctx)
    cloudsBackground.image.src = './assets/img/background-clouds-930x360@2x.png'
    cloudsBackground.speed *= 0.8

    const treesBackground = new Background(this.ctx)
    treesBackground.image.src = './assets/img/background-trees-930x360@2x.png'
    treesBackground.speed *= 1

    this.array = [
      skyBackground,
      horizonBackground,
      buildingsBackground,
      cloudsBackground,
      treesBackground,
    ]
  }

  animate(deltaTime) {
    for (const background of this.array) {
      background.draw()
      background.update(deltaTime)
    }
  }
}
