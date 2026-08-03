import Cookies from 'js-cookie'

interface User {
  id: string
  name: string
  email: string
  role: 'TENANT' | 'LANDLORD' | 'ADMIN'
}

export const saveAuthData = (token: string, user: User) => {
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
