import { Background } from './background.js'
import { Game } from '../game.js'

export class Backgrounds {
  /**
   * @param {Game} game
   */
  constructor(game) {
    const skyBackground = new Background(game, '.background-sky')
    skyBackground.speed *= 0.2

    const horizonBackground = new Background(game, '.background-horizon')
    horizonBackground.speed *= 0.4

    const buildingsBackground = new Background(game, '.background-buildings')
    buildingsBackground.speed *= 0.6

    const cloudsBackground = new Background(game, '.background-clouds')
    cloudsBackground.speed *= 0.8

    const treesBackground = new Background(game, '.background-trees')
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
