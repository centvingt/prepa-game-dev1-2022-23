export class Score {
  constructor() {
    this.value = 0
    this.maxValue = 30

    /** @type {HTMLInputElement} */
    this.rangeInput = document.querySelector('#level')
    this.rangeInput.value = this.value
    this.rangeInput.min = 0
    this.rangeInput.max = this.maxValue
  }

  /**
   * @param {number} number
   */
  increase = (number) => {
    this.value += number
    if (this.value < 0) this.value = 0
    this.rangeInput.value = this.value
  }
}
