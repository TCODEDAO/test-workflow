const pathToRegex = (path) => {
  const data = new RegExp(
    `^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`
  )
  return data
}
const getParams = (match) => {
  const values = match.result.slice(1)
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  )
  return Object.fromEntries(keys.map((key, index) => [key, values[index]]))
}

const router = async () => {
  const routes = [
    {
      path: '/',
      view: async () => {
        const res = await axios.get('/page/home')
        $('#app').html(res.data)
        document.title = 'Trang chủ'
      }
    },
    {
      path: '/images',
      view: async () => {
        const res = await axios.get('/page/image')
        $('#app').html(res.data)
        document.title = 'Hình ảnh'
      }
    },
    {
      path: '/video/:slug',
      view: async (params) => {
        const res = await axios.get(`/page/video/${params.slug}`)
        $('#app').html(res.data)
        document.title = params?.slug
      }
    }
  ]

  const potentialMatches = routes.map((route) => ({
    route,
    result: window.location.pathname.match(pathToRegex(route.path))
  }))
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  )

  if (!match) {
    match = {
      route: routes[0],
      match: []
    }
    window.history.pushState(null, null, '/')
  }

  match.route.view(getParams(match))
}

const navigateTo = (url) => {
  window.history.pushState(null, null, url)
  router()
}

$(window).on('popstate', router)

$(document).ready(() => {
  $('a[data-link]').each(function (index, item) {
    if (item.href === window.location.href) {
      $('.nav-item.active')[0].classList.remove('active')
      this.parentNode.classList.add('active')
    }
  })

  $('a').click(function (e) {
    if (e.target.matches('[data-link]')) {
      e.preventDefault()
      navigateTo(e.target.href)
      $('.nav-item.active')[0].classList.remove('active')
      this.parentNode.classList.add('active')
    }
  })

  router()
})
