import axios from 'axios'

export const AUTHENTICATED = 'authenticated'
export const AUTHEN_ERROR = 'authentication_error'
export const UNAUTHENTICATED = 'unauthenticated'
export const CLEAR_ERROR = 'clearError'
export const FETCH_OWNROOMS = 'fetch_rooms_the_user_owns'
export const FETCH_ERROR = 'fetch_error'

const URL_LOGIN = 'http://localhost:8000/api/auth/login/'
const URL_FETCH_OWNROOMS = 'http://localhost:8000/api/rooms/'

export function logInAction(values) {
  const { email, password } = values

  return async (dispatch) => {
    try {
      const response = await axios.post(URL_LOGIN, { email, password })
      const { token } = response.data
      localStorage.setItem('token', token)
      const payload = token.split('.')[1]
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
      const { user_id } = JSON.parse(window.atob(base64))
      localStorage.setItem('user_id', user_id)
      localStorage.setItem('email', email)
      dispatch({
        type: AUTHENTICATED
      })
    } catch(error) {
      dispatch({
        type: AUTHEN_ERROR,
        payload: 'Invalid email or password'
      })
    }
  }
}

export function onLeaveLogInPage() {
  return {
    type: CLEAR_ERROR
  }
}

export function logOutAction() {
  localStorage.clear()
  return {
    type: UNAUTHENTICATED
  }
}

export function fetchOwnRooms() {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL_FETCH_OWNROOMS)
      dispatch({
        type: FETCH_OWNROOMS,
        payload: response
      })
    } catch(error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error.response
      })
    }
  }
}