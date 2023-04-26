export class Life {
  constructor() {
    this.value = 3

    /** @type {HTMLDivElement} */
    this.ui = document.querySelector('.life')

    /** @type {HTMLSpanElement} */ this.label =
      document.querySelector('.life>span')

    /** @type {HTMLImageElement} */ this.img =
      document.querySelector('.life>img')

    this.setUi()
  }
  decrease = () => {
    this.value--
    if (this.value < 1) this.value = 0

    this.setUi()
    this.ui.style.opacity = 0
    setTimeout(() => (this.ui.style.opacity = 1), 300)
  }
  setUi = () => {
    this.label.innerText = this.value
    this.img.src = `./assets/img/hud-life-${this.value}.svg`
  }
}
