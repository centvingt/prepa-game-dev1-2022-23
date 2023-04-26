import { Backgrounds } from './backgrounds.js'
import { BananaPool } from './banana-pool.js'
import { InputHandler } from './input-handler.js'
import { Key } from './key.js'
import { Life } from './life.js'
import { Player } from './player.js'

export class Game {
  score = 0
  gameOver = false

  constructor() {
    /** @type {HTMLCanvasElement} */
    this.canvas = document.querySelector('canvas')
    this.canvas.width = this.width = 480
    this.canvas.height = this.height = 360

    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext('2d')

    this.life = new Life()

    this.isPaused = false
    this.inputHandler = new InputHandler()

    this.backgrounds = new Backgrounds(this.ctx)

    this.bananaPool = new BananaPool(this)

    this.player = new Player(
      this.canvas.width,
      this.canvas.height,
      this.bananaPool,
      this.life.decrease
    )

    this.initializeBananaTimer()

    this.lastTimeStamp = 0
    this.animate(this.lastTimeStamp)
  }

  /**
   * @param  {number} timeStamp
   */
  animate = (timeStamp) => {
    if (this.inputHandler.keys.has(Key.Enter)) {
      this.isPaused = !this.isPaused
      this.inputHandler.keys.delete(Key.Enter)
    }

    const deltaTime = timeStamp - this.lastTimeStamp
    this.lastTimeStamp = timeStamp

    if (!this.isPaused) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.backgrounds.animate(deltaTime)

      this.bananaPool.render(timeStamp, deltaTime)

      this.player.draw(this.ctx)
      this.player.update(timeStamp, this.inputHandler)
    }

    window.requestAnimationFrame(this.animate)
  }

  initializeBananaTimer = () => {
    this.bananaTime = 0
    this.nextBananaTime = Math.random() * 50 + 500
  }
}
