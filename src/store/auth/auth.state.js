import Cookies from 'js-cookie'
const storeCookies = () => {
  const aux = Cookies.get('authUser')
  // console.log(aux)
  return (typeof aux === 'undefined') ? null : JSON.parse(aux)
}

export const authState = {
  status: storeCookies() ? { loggedIn: true } : {},
  data: storeCookies() || null,
  user: {}
}
