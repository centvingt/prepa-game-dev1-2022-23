import { Key } from './key.js'

const upBtn = document.querySelector('.cross-controller__up')
const rightBtn = document.querySelector('.cross-controller__right')
const downBtn = document.querySelector('.cross-controller__down')
const leftBtn = document.querySelector('.cross-controller__left')
const aBtn = document.querySelector('.a-btn')
const bBtn = document.querySelector('.b-btn')

export class InputHandler {
  constructor() {
    /** @type {Set<Key>} */
    this.keys = new Set()

    window.addEventListener('keydown', ({ code }) => {
      // if (
      //     e.code === Key.ArrowDown ||
      //     e.code === Key.ArrowUp ||
      //     e.code === Key.ArrowLeft ||
      //     e.code === Key.ArrowRight ||
      //     e.code === Key.Space
      //   ) {
      if (Object.keys(Key).includes(code)) this.keys.add(code)
    })

    window.addEventListener('keyup', ({ code }) => {
      if (code === Key.Enter) return

      if (Object.keys(Key).includes(code)) this.keys.delete(code)
    })

    upBtn.addEventListener('touchstart', () => {
      this.keys.add(Key.ArrowUp)
      upBtn.src = './assets/img/cross-button-pressed.svg'
    })
    upBtn.addEventListener('touchend', () => {
      this.keys.delete(Key.ArrowUp)
      upBtn.src = './assets/img/cross-button.svg'
    })

    rightBtn.addEventListener('touchstart', () => {
      this.keys.add(Key.ArrowRight)
      rightBtn.src = './assets/img/cross-button-pressed.svg'
    })
    rightBtn.addEventListener('touchend', () => {
      this.keys.delete(Key.ArrowRight)
      rightBtn.src = './assets/img/cross-button.svg'
    })

    downBtn.addEventListener('touchstart', () => {
      this.keys.add(Key.ArrowDown)
      downBtn.src = './assets/img/cross-button-pressed.svg'
    })
    downBtn.addEventListener('touchend', () => {
      this.keys.delete(Key.ArrowDown)
      downBtn.src = './assets/img/cross-button.svg'
    })

    leftBtn.addEventListener('touchstart', () => {
      this.keys.add(Key.ArrowLeft)
      leftBtn.src = './assets/img/cross-button-pressed.svg'
    })
    leftBtn.addEventListener('touchend', () => {
      this.keys.delete(Key.ArrowLeft)
      leftBtn.src = './assets/img/cross-button.svg'
    })

    aBtn.addEventListener('touchstart', () => {
      this.keys.add(Key.Enter)
      aBtn.classList.add('pressed')
    })
    aBtn.addEventListener('touchend', () => {
      aBtn.classList.remove('pressed')
    })

    bBtn.addEventListener('touchstart', () => {
      this.keys.add(Key.Space)
      bBtn.classList.add('pressed')
    })
    bBtn.addEventListener('touchend', () => {
      this.keys.delete(Key.Space)
      bBtn.classList.remove('pressed')
    })
  }
}
