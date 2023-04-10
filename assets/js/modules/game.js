import { Backgrounds } from './backgrounds.js'
import { Banana } from './banana.js'
import { InputHandler } from './input-handler.js'
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

    this.inputHandler = new InputHandler()

    this.backgrounds = new Backgrounds(this.ctx)

    this.player = new Player(this.canvas.width, this.canvas.height)

    /** @type {Banana[]} */
    this.bananas = []

    this.initializeBananaTimer()

    this.lastTimeStamp = 0
    this.animate(this.lastTimeStamp)
  }

  /**
   * @param  {number} timeStamp
   */
  animate = (timeStamp) => {
    const deltaTime = timeStamp - this.lastTimeStamp
    this.lastTimeStamp = timeStamp

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.backgrounds.animate(deltaTime)

    this.bananaTime += deltaTime
    if (this.bananaTime >= this.nextBananaTime) {
      this.bananas.push(new Banana(this))
      this.initializeBananaTimer()
    }
    for (const banana of this.bananas) {
      banana.draw()
      banana.update(timeStamp, deltaTime)
    }
    this.bananas.filter((banana) => banana.isAlive)
    this.player.draw(this.ctx)
    this.player.update(timeStamp, this.inputHandler)

    window.requestAnimationFrame(this.animate)
  }

  initializeBananaTimer = () => {
    this.bananaTime = 0
    this.nextBananaTime = Math.random() * 50 + 500
  }
}
