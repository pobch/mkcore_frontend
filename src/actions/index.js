import axios from 'axios'

export const SIGN_UP = 'sign_up'
export const AUTHENTICATED = 'authenticated'
export const UNAUTHENTICATED = 'unauthenticated'
export const AUTHEN_ERROR = 'authentication_error'
export const CLEAR_AUTH_ERROR_MSG = 'clear_authen_error_msg'

export const FETCH_OWNROOMS = 'fetch_rooms_the_user_owns'
export const FETCH_OWN_ROOM = 'fetch_specific_room_the_user_owns'
export const CREATE_OWN_ROOM = 'create_own_room'
export const UPDATE_OWN_ROOM = 'update_own_room'
export const DELETE_OWN_ROOM = 'delete_own_room'
export const ERROR_IN_OWNROOMS = 'ownrooms_error_from_api'

export const FETCH_GUESTROOMS = 'fetch_guest_rooms'
export const FETCH_GUEST_ROOM = 'fetch_one_guest_room'
export const JOIN_ROOM = 'join_room'
export const LEAVE_ROOM = 'leave_room'
export const CLEAR_ERROR_MSG = 'clear_error_message'
export const ERROR_IN_GUESTROOMS = 'guestrooms_error_from_api'

export const SUBMIT_ANSWER = 'submit_a_survey_answer'
export const FETCH_ANSWER = 'fetch_an_existing_answer'
export const ERROR_IN_ANSWERS = 'answers_error_from_api'

export const HIDE_COMPONENT = 'hide_this_component'
export const SHOW_COMPONENT = 'show_this_component'

const BASE_API_URL = process.env.REACT_APP_API_URL // environment variable

const URL_LOGIN = `${BASE_API_URL}auth/login/`
const URL_FETCH_OWNROOMS = `${BASE_API_URL}rooms/?query=owner`
const URL_FETCH_GUESTROOMS = `${BASE_API_URL}rooms/?query=guest`
const URL_RETRIEVE_UPDATE_OWNROOM = `${BASE_API_URL}rooms/` // + id
const URL_SIGNUP = `${BASE_API_URL}auth/register/`
const URL_JOIN_ROOM = URL_RETRIEVE_UPDATE_OWNROOM + 'join/'
const URL_LEAVE_ROOM = URL_RETRIEVE_UPDATE_OWNROOM + 'unjoin/'
const URL_CREATE_ANSWER = BASE_API_URL + 'answers/'

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
    type: CLEAR_AUTH_ERROR_MSG
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
        type: ERROR_IN_OWNROOMS,
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
        type: ERROR_IN_OWNROOMS,
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
        type: ERROR_IN_GUESTROOMS,
        payload: error.response
      })
    }
  }
}

export function fetchGuestRoom(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_RETRIEVE_UPDATE_OWNROOM}${id}/`)
      dispatch({
        type: FETCH_GUEST_ROOM,
        payload: response
      })
    } catch(error) {
      dispatch({
        type: ERROR_IN_GUESTROOMS,
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
        type: CREATE_OWN_ROOM,
        payload: response
      })
    } catch(error) {
      dispatch({
        type: ERROR_IN_OWNROOMS,
        payload: error.response
      })
      throw error // return error to catch{} in the container component who call this function  
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

export function deleteRoom(id) {
  return async (dispatch) => {
    await axios.delete(`${URL_RETRIEVE_UPDATE_OWNROOM}${id}/`)
    dispatch({
      type: DELETE_OWN_ROOM,
      payload: id
    })
  }
}

export function joinRoomAction(values) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_JOIN_ROOM, values)
      dispatch({
        type: JOIN_ROOM,
        payload: response
      })
    } catch(e) {
      dispatch({
        type: ERROR_IN_GUESTROOMS,
        payload: e.response
      })
    }
  }
}

export function resetError() {
  return {
    type: CLEAR_ERROR_MSG
  }
}

export function leaveRoom(id) {
  return async (dispatch) => {
    await axios.post(URL_LEAVE_ROOM, {room_id: id})
    dispatch({
      type: LEAVE_ROOM,
      payload: id
    })
  }
}

export function submitAnswer(roomId, {answer}) {
  return async (dispatch) => {
    const response = await axios.post(URL_CREATE_ANSWER, {room: +roomId, answer})
    dispatch({
      type: SUBMIT_ANSWER,
      payload: response
    })
  }
}

export function fetchAnswer(roomId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_CREATE_ANSWER}${roomId}/`)
      dispatch({
        type: FETCH_ANSWER,
        payload: response
      })
    } catch(error) {
      dispatch({
        type: ERROR_IN_ANSWERS,
        payload: error.response
      })
    }
  }
}