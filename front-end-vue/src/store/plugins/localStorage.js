const JWT = 'jwt'

const init = localStorage[JWT]

const plugin = store => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case 'auth/setToken':
        localStorage[JWT] = mutation.payload
        break
      case 'auth/resetToken':
        localStorage.removeItem(JWT)
        break
    }
  })
}

export default plugin
export { init }
