import { Background } from './background.js'
import { Game } from '../game.js'

export class Backgrounds {
  /**
   * @param {Game} game
   */
  constructor(game) {
    const skyBackground = new Background(game)
    skyBackground.image.src = './assets/img/background-sky-930x360.jpg'
    skyBackground.speed *= 0.2

    const horizonBackground = new Background(game)
    horizonBackground.image.src = './assets/img/background-horizon-930x360.png'
    horizonBackground.speed *= 0.4

    const buildingsBackground = new Background(game)
    buildingsBackground.image.src =
      './assets/img/background-buildings-930x360.png'
    buildingsBackground.speed *= 0.6

    const cloudsBackground = new Background(game)
    cloudsBackground.image.src = './assets/img/background-clouds-930x360.png'
    cloudsBackground.speed *= 0.8

    const treesBackground = new Background(game)
    treesBackground.image.src = './assets/img/background-trees-930x360.png'
    treesBackground.speed *= 1

    this.array = [
      skyBackground,
      horizonBackground,
      buildingsBackground,
      cloudsBackground,
      treesBackground,
    ]
  }

  render() {
    for (const background of this.array) {
      background.render()
    }
  }
}
