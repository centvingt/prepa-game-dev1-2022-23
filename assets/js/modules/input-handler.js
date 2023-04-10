import { Key } from './key.js'

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
      if (Object.keys(Key).includes(code)) this.keys.delete(code)
    })
  }
}
