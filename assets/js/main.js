import { Game } from './modules/game.js'

new Game()

const mobileUi = document.querySelectorAll('.mobile-ui')
if (
  !/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  document.querySelector('.desktop-instructions').style.display = 'block'
  for (const ui of mobileUi) ui.style.display = 'none'
  document.querySelector('.game').classList.add('desktop')
}

// if (navigator.serviceWorker) {
//   navigator.serviceWorker
//     .register('/assets/js/sw.js')
//     .then(function (registration) {
//       console.log(
//         'ServiceWorker registration successful with scope:',
//         registration.scope
//       )
//     })
//     .catch(function (error) {
//       console.log('ServiceWorker registration failed:', errror)
//     })
// }

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

// const elem = document.querySelector('canvas')
// if (elem.requestFullscreen) {
//   elem.requestFullscreen()
// }
// document.addEventListener('click', () => {
//   console.log('assets/js/main.js > click')

//   const conf = confirm('webkitEnterFullscreen')
//   const docelem = document.documentElement

//   if (conf == true) {
//     if (docelem.requestFullscreen) {
//       docelem.requestFullscreen()
//     } else if (docelem.mozRequestFullScreen) {
//       docelem.mozRequestFullScreen()
//     } else if (docelem.webkitRequestFullScreen) {
//       docelem.webkitRequestFullScreen()
//       docelem.webkitEnterFullscreen()
//     } else if (docelem.msRequestFullscreen) {
//       docelem.msRequestFullscreen()
//     }
//   }
// })

// const appHeight = () => {
//   const doc = document.documentElement
//   doc.style.setProperty('--app-height', `${window.innerHeight}px`)
// }
// window.addEventListener('resize', appHeight)
// appHeight()
