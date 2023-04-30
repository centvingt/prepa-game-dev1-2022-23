const cacheName = '230411-1016'
self.addEventListener('install', (event) => {
  console.log('Service worker installing...')
  event.waitUntil(async () => {
    try {
      const cache = awaitcaches.open(cacheName)
      await cache.addAll([
        '/index.html',
        '/manifest.webmanifest',
        '/assets/css/reset.css',
        '/assets/css/style.css',
        '/assets/fonts/VCR_OSD_MONO_1.001.ttf',
        '/assets/img/background-all-930x360.jpg',
        '/assets/img/background-buildings-930x360.png',
        '/assets/img/background-buildings-930x360@2x.png',
        '/assets/img/background-clouds-930x360.png',
        '/assets/img/background-clouds-930x360@2x.png',
        '/assets/img/background-horizon-930x360@2x.png',
        '/assets/img/background-horizon-930x360.png',
        '/assets/img/background-sky-930x360@2x.jpg',
        '/assets/img/background-sky-930x360.jpg',
        '/assets/img/background-trees-930x360@2x.png',
        '/assets/img/background-trees-930x360.png',
        '/assets/img/banana-spritesheet.png',
        '/assets/img/icon-192x192.png',
        '/assets/img/icon-512x512.png',
        '/assets/img/icon-maskable.png',
        '/assets/img/player-spritesheet.png',
        '/assets/img/player-spritesheet@2x.png',
        '/assets/img/screen-mask.svg',
        '/assets/img/screen-stroke.svg',
        '/assets/img/cross-button-pressed.svg',
        '/assets/img/cross-button.svg',
        '/assets/js/main.js',
        '/assets/js/modules/background.js',
        '/assets/js/modules/backgrounds.js',
        '/assets/js/modules/banana-pool.js',
        '/assets/js/modules/banana.js',
        '/assets/js/modules/game.js',
        '/assets/js/modules/input-handler.js',
        '/assets/js/modules/key.js',
        '/assets/js/modules/player.js',
      ])
      return console.log('sw.js > cache.addAll > données mises en cache')
    } catch (error) {
      console.log('sw.js > cache.addAll > error >', error)
    }
  })
})

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith('chrome-extension')) return

  event.respondWith(
    (async () => {
      try {
        const cachedResponse = await caches.match(event.request)

        if (cachedResponse) return cachedResponse

        // console.log('sw.js > no cache >', event.request.url)

        const fetchResponse = await fetch(event.request)

        if (!fetchResponse) throw new Error('Fetch n’a pas obtenu de réponse')

        const cache = await caches.open(cacheName)

        const response = fetchResponse.clone()

        await cache.put(event.request, fetchResponse)

        return response
      } catch (error) {
        console.error(
          'sw.js > fetch event listener > ' + event.request.url + ' > error >',
          error
        )
      }
    })()
  )
})
