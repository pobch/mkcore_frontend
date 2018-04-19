import axios from 'axios'

export const AUTHENTICATED = 'authenticated'
export const AUTHEN_ERROR = 'authentication_error'
export const UNAUTHENTICATED = 'unauthenticated'
export const CLEAR_ERROR = 'clearError'
export const FETCH_OWNROOMS = 'fetch_rooms_the_user_owns'
export const FETCH_OWN_ERROR = 'fetch_ownrooms_error'
export const FETCH_GUESTROOMS = 'fetch_guest_rooms'
export const FETCH_GUEST_ERROR = 'fetch_guestrooms_error'
export const FETCH_OWN_ROOM = 'fetch_specific_room_the_user_owns'
export const UPDATE_OWN_ROOM = 'update_own_room'
export const CREATE_ROOM = 'create_own_room'
export const SIGN_UP = 'sign_up'
export const HIDE_COMPONENT = 'hide_this_component'
export const SHOW_COMPONENT = 'show_this_component'

const URL_LOGIN = 'http://localhost:8000/api/auth/login/'
const URL_FETCH_OWNROOMS = 'http://localhost:8000/api/rooms/?query=owner'
const URL_FETCH_GUESTROOMS = 'http://localhost:8000/api/rooms/?query=guest'
const URL_RETRIEVE_UPDATE_OWNROOM = 'http://localhost:8000/api/rooms/' // + id
const URL_SIGNUP = 'http://localhost:8000/api/auth/register/'

export function logInAction(values, callback) {
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
      callback()
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

export function logOutAction(callback) {
  localStorage.clear()
  callback()
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
        type: FETCH_OWN_ERROR,
        payload: error.response
      })
    }
  }
}

export function fetchOwnRoom(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_RETRIEVE_UPDATE_OWNROOM}${id}/`)
      dispatch({
        type: FETCH_OWN_ROOM,
        payload: response
      })
    } catch(error) {
      dispatch({
        type: FETCH_OWN_ERROR,
        payload: error.response
      })
    }
  }
}

export function fetchGuestRooms() {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL_FETCH_GUESTROOMS)
      dispatch({
        type: FETCH_GUESTROOMS,
        payload: response
      })
    } catch(error) {
      dispatch({
        type: FETCH_GUEST_ERROR,
        payload: error.response
      })
    }
  }
}

export function updateRoom(id, values) {
  return async (dispatch) => {
    const response = await axios.patch(`${URL_RETRIEVE_UPDATE_OWNROOM}${id}/`, values)
    dispatch({
      type: UPDATE_OWN_ROOM,
      payload: response
    })
  }
}

export function createRoom(values) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_RETRIEVE_UPDATE_OWNROOM, values)
      dispatch({
        type: CREATE_ROOM,
        payload: response
      })
    } catch(error) {
      console.log(error)
    }
  }
}

export function signUpAction(values, callback) {
  return async (dispatch) => {
    const response = await axios.post(URL_SIGNUP, values)
    dispatch({
      type: SIGN_UP,
      payload: response
    })
    callback()
  }
}

export function hideComponentAction() {
  return {
    type: HIDE_COMPONENT,
    payload: false
  }
}

export function showComponentAction() {
  return {
    type: SHOW_COMPONENT,
    payload: true
  }
}