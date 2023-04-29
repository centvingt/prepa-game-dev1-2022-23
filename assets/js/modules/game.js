import { Backgrounds } from './backgrounds.js'
import { BananaBoss } from './banana-boss/banana-boss.js'
import { BananaPool } from './banana-pool.js'
import { GlitchOverlay } from './glitch-overlay.js'
import { InputHandler } from './input-handler.js'
import { Key } from './key.js'
import { Life } from './life.js'
import { Opener } from './opener.js'
import { PeaPool } from './pea-pool.js'
import { Player } from './player.js'
import { Score } from './score.js'

export class Game {
  state = GameState.opener

  /**
   * @param {boolean} deviceIsMobile
   */
  constructor(deviceIsMobile) {
    this.deviceIsMobile = deviceIsMobile

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

    this.score = new Score()

    this.glitchOverlay = new GlitchOverlay(this.ctx, this.life)

    this.opener = new Opener(this)
    this.bananaBoss = new BananaBoss(this)

    this.bananaPool = new BananaPool(this)
    this.peaPool = new PeaPool(this)

    this.player = new Player(this)

    this.initializeBananaTimer()

    this.lastTimeStamp = 0
    this.animate(this.lastTimeStamp)
  }

  /**
   * @param  {number} timeStamp
   */
  animate = (timeStamp) => {
    if (this.inputHandler.keys.has(Key.Enter)) {
      if (this.state === GameState.opener) {
        this.state = GameState.introLevel1
      } else if (this.state === GameState.introLevel1) {
        this.state = GameState.level1
      } else this.isPaused = !this.isPaused

      this.inputHandler.keys.delete(Key.Enter)
    }

    const deltaTime = timeStamp - this.lastTimeStamp
    this.lastTimeStamp = timeStamp

    if (!this.isPaused) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.backgrounds.animate(deltaTime)

      if (this.state === GameState.introLevel1)
        this.bananaBoss.render(timeStamp, deltaTime)

      if (this.state === GameState.level1) {
        this.bananaPool.render(timeStamp, deltaTime)
        this.peaPool.render(timeStamp, deltaTime)

        this.player.draw(this.ctx)
        this.player.update(timeStamp, this.inputHandler)
      }

      this.glitchOverlay.render(timeStamp)

      if (this.state === GameState.opener) {
        this.opener.render(timeStamp)
      }
    }

    window.requestAnimationFrame(this.animate)
  }

  initializeBananaTimer = () => {
    this.bananaTime = 0
    this.nextBananaTime = Math.random() * 50 + 500
  }
}
const GameState = Object.freeze({
  opener: Symbol('opener'),
  introLevel1: Symbol('introLevel1'),
  level1: Symbol('level1'),
  bossLevel1: Symbol('bossLevel1'),
})
