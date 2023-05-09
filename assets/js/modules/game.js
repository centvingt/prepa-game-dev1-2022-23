import { Backgrounds } from './background/backgrounds.js'
import { BananaBoss } from './banana-boss.js'
import { BananaPool } from './banana-skin/banana-pool.js'
import { GlitchOverlay } from './glitch-overlay.js'
import { InputHandler, Key } from './handlers/input-handler.js'
import { OpeningScreen } from './screens/opening-screen.js'
import { Player } from './player/player.js'
import { Life } from './hud/life.js'
import { Level } from './hud/level.js'
import { Ammunition } from './hud/ammunition.js'
import { WinScreen } from './screens/win-screen.js'
import { LostScreen } from './screens/lost-screen.js'
import { CannedPeasPool } from './canned-peas/canned-peas-pool.js'

export class Game {
  #_state = GameState.opening

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

    this.life = new Life(this)
    this.level = new Level(this)

    this.isPaused = false
    this.inputHandler = new InputHandler()
    this.ammunition = new Ammunition(this)

    this.backgrounds = new Backgrounds(this)

    this.glitchOverlay = new GlitchOverlay(this)

    this.openingScreen = new OpeningScreen(this)
    this.winScreen = new WinScreen(this)
    this.lostScreen = new LostScreen(this)

    this.bananaBoss = new BananaBoss(this)

    this.bananaPool = new BananaPool(this)

    this.cannedPeasPool = new CannedPeasPool(this)

    this.player = new Player(this)

    this.initializeBananaTimer()

    this.animate(0)

    this.state = GameState.opening
  }

  set state(newValue) {
    this.level.gameState = newValue
    this.life.gameState = newValue
    this.ammunition.gameState = newValue
    this.bananaPool.gameState = newValue
    this.bananaBoss.gameState = newValue
    this.#_state = newValue
  }
  get state() {
    return this.#_state
  }

  /**
   * @param  {number} timeStamp
   */
  animate = (timestamp) => {
    this.timestamp.current = timestamp

    if (this.inputHandler.keys.has(Key.Enter)) {
      switch (this.state) {
        case GameState.opening:
          this.state = GameState.introLevel1
          break
        case GameState.introLevel1:
          this.bananaPool.disableAllBananas()
          this.bananaPool.resetTimer()
          this.state = GameState.level1
          break
        case GameState.win:
        case GameState.lost:
          this.bananaPool.disableAllBananas()
          this.state = GameState.opening
          break
        default:
          this.isPaused = !this.isPaused
          break
      }

      this.inputHandler.keys.delete(Key.Enter)
    }

    this.timestamp.delta = this.timestamp.current - this.timestamp.last
    this.timestamp.last = this.timestamp.current

    if (!this.isPaused) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.backgrounds.render()

      if (this.state === GameState.opening) this.openingScreen.render()
      if (this.state === GameState.win) this.winScreen.render()
      if (this.state === GameState.lost) this.lostScreen.render()

      if (
        this.state === GameState.introLevel1 ||
        this.state === GameState.bossLevel1
      )
        this.bananaBoss.render()

      if (
        this.state === GameState.introLevel1 ||
        this.state === GameState.level1 ||
        this.state === GameState.bossLevel1
      ) {
        this.player.render()
        this.bananaPool.render()
      }

      if (this.state === GameState.level1) this.cannedPeasPool.render()

      this.glitchOverlay.render()
    }

    window.requestAnimationFrame(this.animate)
  }

  initializeBananaTimer = () => {
    this.bananaTime = 0
    this.nextBananaTime = Math.random() * 50 + 500
  }
}
export const GameState = Object.freeze({
  opening: Symbol('opening'),
  introLevel1: Symbol('introLevel1'),
  level1: Symbol('level1'),
  bossLevel1: Symbol('bossLevel1'),
  win: Symbol('win'),
  lost: Symbol('lost'),
})
