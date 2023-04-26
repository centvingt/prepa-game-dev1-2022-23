export class Life {
  constructor() {
    this.value = 3

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
  }
  setUi = () => {
    this.label.innerText = this.value
    this.img.src = `./assets/img/hud-life-${this.value}.svg`
  }
}
