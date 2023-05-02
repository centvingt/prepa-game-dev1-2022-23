import { Backgrounds } from './background/backgrounds.js'
import { BananaBoss } from './banana-boss.js'
import { BananaPool } from './banana/banana-pool.js'
import { GlitchOverlay } from './glitch-overlay.js'
import { InputHandler, Key } from './handlers/input-handler.js'
import { Life } from './life.js'
import { Opener } from './opener.js'
import { PeaPool } from './player/pea/pea-pool.js'
import { Player } from './player/player.js'
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

    this.canvasBorderLength = 8

    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext('2d')

    this.lastTimeStamp = 0
    this.currentTimeStamp = 0
    this.deltaTime = 0
    this.timestamp = {
      current: 0,
      last: 0,
      delta: 0,
    }

    this.life = new Life()

    this.isPaused = false
    this.inputHandler = new InputHandler()

    this.backgrounds = new Backgrounds(this)

    this.score = new Score()

    this.glitchOverlay = new GlitchOverlay(this)

    this.opener = new Opener(this)
    this.bananaBoss = new BananaBoss(this)

    this.bananaPool = new BananaPool(this)
    this.peaPool = new PeaPool(this)

    this.player = new Player(this)

    this.initializeBananaTimer()

    this.animate(0)
  }

  /**
   * @param  {number} timeStamp
   */
  animate = (timestamp) => {
    this.timestamp.current = timestamp

    if (this.inputHandler.keys.has(Key.Enter)) {
      if (this.state === GameState.opener) {
        this.state = GameState.introLevel1
        this.bananaPool.resetTimer()
      } else if (this.state === GameState.introLevel1) {
        this.bananaPool.disableAllBananas()
        this.state = GameState.level1
      } else this.isPaused = !this.isPaused

      this.inputHandler.keys.delete(Key.Enter)
    }

    this.timestamp.delta = this.timestamp.current - this.timestamp.last
    this.timestamp.last = this.timestamp.current

    if (!this.isPaused) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.backgrounds.render()

      if (this.state === GameState.introLevel1) {
        this.player.render()
        this.bananaBoss.render()
        this.bananaPool.render()
      }

      if (this.state === GameState.level1) {
        this.bananaPool.render()
        this.peaPool.render()

        this.player.render()
      }

      this.glitchOverlay.render()

      if (this.state === GameState.opener) {
        this.opener.render()
      }
    }

    window.requestAnimationFrame(this.animate)
  }

  initializeBananaTimer = () => {
    this.bananaTime = 0
    this.nextBananaTime = Math.random() * 50 + 500
  }
}
export const GameState = Object.freeze({
  opener: Symbol('opener'),
  introLevel1: Symbol('introLevel1'),
  level1: Symbol('level1'),
  bossLevel1: Symbol('bossLevel1'),
})
