import Cookies from 'js-cookie'

export const saveAuthData = (token: string, user: any) => {
  Cookies.set('accessToken', token, {
    expires: 7,
  })

  localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
  if (typeof window === 'undefined') return null

  const user = localStorage.getItem('user')

  return user ? JSON.parse(user) : null
}

export const removeAuthData = () => {
  Cookies.remove('accessToken')

  localStorage.removeItem('user')
}
