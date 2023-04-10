import { Game } from './modules/game.js'

new Game()

if (
  !/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
)
  document.querySelector('.desktop-instructions').style.display = 'block'

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
// const elem = document.querySelector('canvas')
// if (elem.requestFullscreen) {
//   elem.requestFullscreen()
// }

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
