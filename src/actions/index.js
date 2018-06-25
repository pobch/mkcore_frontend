import axios from 'axios'
import _ from 'lodash'
import FileSaver from 'file-saver' // for export result
import { createSocket } from 'dgram';

export const SIGN_UP = 'sign_up'
export const SIGN_UP_CONFIRM = 'sign_up_activate_confirm'
export const AUTHENTICATED = 'authenticated'
export const UNAUTHENTICATED = 'unauthenticated'
export const AUTHEN_ERROR = 'authentication_error'
export const CLEAR_AUTH_ERROR_MSG = 'clear_authen_error_msg'
export const PASSWORD_FORGOT = 'forgot_password'
export const PASSWORD_FORGOT_CONFIRM = 'forgot_password_confirm_with_uid_token'

export const FETCH_OWNROOMS = 'fetch_rooms_the_user_owns'
export const FETCH_OWN_ROOM = 'fetch_specific_room_the_user_owns'
export const CREATE_OWN_ROOM = 'create_own_room'
export const UPDATE_OWN_ROOM = 'update_own_room'
export const PUBLISH_OWN_ROOM = 'publish_own_room'
export const DELETE_OWN_ROOM = 'delete_own_room'
export const ERROR_IN_OWNROOMS = 'ownrooms_error_from_api'

export const FETCH_JOINREQS_OF_OWN_ROOM = 'fetch_join_requests_of_one_own_room'
export const ACCEPT_JOINREQ = 'accept_one_join_request'
export const ACCEPT_ALL_JOINREQS = 'accept_all_pending_join_reqs'
export const BULK_CREATE_JOINREQS = 'bulk_create_join_reqs'
export const DENY_JOINREQ = 'deny_one_join_request'
export const RESET_JOINREQS_LIST = 'clear_joinreqs_in_store'

export const FETCH_GUESTROOMS = 'fetch_guest_rooms'
export const FETCH_GUEST_ROOM = 'fetch_one_guest_room'
export const FETCH_PENDING_ROOMS_INFO = 'fetch_pending_rooms_relation_info'
export const JOIN_ROOM = 'join_room'
export const LEAVE_ROOM = 'leave_room'
export const CLEAR_ERROR_MSG = 'clear_error_message'
export const ERROR_IN_GUESTROOMS = 'guestrooms_error_from_api'

export const SUBMIT_ANSWER = 'submit_a_survey_answer'
export const FETCH_ANSWER = 'fetch_an_existing_answer'
export const FETCH_MY_ANSWERS = 'fetch_all_answers_of_me'
export const ERROR_IN_ANSWERS = 'answers_error_from_api'

export const HIDE_COMPONENT = 'hide_this_component'
export const SHOW_COMPONENT = 'show_this_component'

export const FETCH_PROFILE = 'fetch_user_profile'
export const UPDATE_PROFILE = 'update_user_profile'

export const EXPORT_ANSWERS_RESULT = 'export_all_answers_result_of_an_own_room'

const BASE_API_URL = process.env.REACT_APP_API_URL // environment variable

const URL_SIGNUP = `${BASE_API_URL}auth/register/`
const URL_SIGNUP_CONFIRM = `${BASE_API_URL}auth/confirmation/` // + ?uid=xxx&token=yyy
const URL_LOGIN = `${BASE_API_URL}auth/login/`
const URL_PASSWORD_FORGOT = `${BASE_API_URL}djoser/password/reset/`
const URL_PASSWORD_FORGOT_CONFIRM = `${BASE_API_URL}djoser/password/reset/confirm/`
const URL_RETRIEVE_UPDATE_PROFILE = `${BASE_API_URL}users/` // + user_id from localStorage
const URL_FETCH_GUESTROOMS = `${BASE_API_URL}rooms/?query=guest`
const URL_FETCH_OWNROOMS = `${BASE_API_URL}rooms/?query=owner`
const URL_FETCH_OWNROOM_BY_ROOM_CODE = `${BASE_API_URL}rooms/search/?room_code=` // + room_code to search
const URL_RETRIEVE_UPDATE_OWNROOM = `${BASE_API_URL}rooms/` // + id
const URL_FETCH_JOINREQS_BY_ROOM_ID = `${BASE_API_URL}joinreqs/byroomid/` // + room_id to search
const URL_RETRIEVE_UPDATE_DEL_JOINREQ = `${BASE_API_URL}joinreqs/` // +  a joinReq's id
const URL_BULK_UPDATE_JOINREQS = `${BASE_API_URL}joinreqs/accept-all/` // POST {"ids": [2,3,4]}
const URL_BULK_CREATE_JOINREQS = `${BASE_API_URL}joinreqs/bulkcreate/` // POST [{<row to create>}, {...}]
const URL_FETCH_PENDINGROOMS_INFO = `${BASE_API_URL}joinreqs/pending/`
const URL_JOIN_ROOM = `${BASE_API_URL}join/`
const URL_LEAVE_ROOM = `${BASE_API_URL}unjoin/`
const URL_CREATE_ANSWER = `${BASE_API_URL}answers/`
const URL_FETCH_ANSWER_BY_ROOM_ID = `${BASE_API_URL}answers/byroomid/` // + room_id to search
const URL_FETCH_MY_ANSWER = `${BASE_API_URL}answers/me/`
const URL_EXPORT_ANSWERS = `${BASE_API_URL}export/answers/?room_id=` // + room_id to be exported


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

export function passwordForgotAction(values) {
  const { email } = values

  return async (dispatch) => {
    await axios.post(URL_PASSWORD_FORGOT, { email }) // the response's body will be blank
    dispatch({
      type: PASSWORD_FORGOT
    })
  }
}

export function passwordForgotConfirmAction(values) {
  const { uid, token, new_password } = values

  return async (dispatch) => {
    await axios.post(URL_PASSWORD_FORGOT_CONFIRM, { uid, token, new_password })
    dispatch({
      type: PASSWORD_FORGOT_CONFIRM
    })
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

export function fetchPendingRooms() {
  return async (dispatch) => {
    const response = await axios.get(URL_FETCH_PENDINGROOMS_INFO)
    dispatch({
      type: FETCH_PENDING_ROOMS_INFO,
      payload: response
    })
  }
}

export function fetchJoinReqsOfOwnRoom(room_id) {
  return async (dispatch) => {
    const response = await axios.get(`${URL_FETCH_JOINREQS_BY_ROOM_ID}${room_id}/`)
    dispatch({
      type: FETCH_JOINREQS_OF_OWN_ROOM,
      payload: response
    })
  }
}

export function bulkCloneJoinReqsFromRoomCode(fromRoomCode, targetRoomId) {
  return async (dispatch) => {
    const room = await axios.get(`${URL_FETCH_OWNROOM_BY_ROOM_CODE}${fromRoomCode}`)
    const fromRoomId = +room.data.id
    dispatch(bulkCloneJoinReqsFromRoomId(fromRoomId, targetRoomId))
  }
}

export function bulkCloneJoinReqsFromRoomId(fromRoomId, targetRoomId) {
  return async (dispatch) => {
    // build each row to create:
    const oldRows = await axios.get(`${URL_FETCH_JOINREQS_BY_ROOM_ID}${fromRoomId}/`)
    const newRows = oldRows.data.map(row => {
      return {
        created_by_room_owner: true,
        user: row.user,
        room: targetRoomId,
        accepted: row.accepted,
        accept_date: row.accepted ? new Date() : null
      }
    })
    // bulk create new join reqs
    const response = await axios.post(URL_BULK_CREATE_JOINREQS, newRows)
    dispatch({
      type: BULK_CREATE_JOINREQS,
      payload: response // if not error, response.data is array of new created rows
    })
  }
}

export function acceptJoinReq(guestRoomRelationId) {
  return async (dispatch) => {
    const response = await axios.patch(`${URL_RETRIEVE_UPDATE_DEL_JOINREQ}${guestRoomRelationId}/`,
      { accepted: true, 
        accept_date: new Date() 
      }
    )
    dispatch({
      type: ACCEPT_JOINREQ,
      payload: response // obj type
    })
  }
}

export function acceptAllJoinReqs(ids) {
  // 'ids' is array of not-yet-accepted-join-reqs id
  return async (dispatch) => {
    const response = await axios.post(URL_BULK_UPDATE_JOINREQS, {ids})
    dispatch({
      type: ACCEPT_ALL_JOINREQS,
      payload: response // array type
    })
  }
}

export function denyJoinReq(guestRoomRelationId) {
  return async (dispatch) => {
    await axios.delete(`${URL_RETRIEVE_UPDATE_DEL_JOINREQ}${guestRoomRelationId}/`)
    dispatch({
      type: DENY_JOINREQ,
      payload: guestRoomRelationId
    })
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

export function publishRoom(id) {
  return async (dispatch) => {
    const room = await axios.get(`${URL_RETRIEVE_UPDATE_OWNROOM}${id}/`)
    let response
    // field 'have_survey_when_published' has a default value == True
    if( _.isEmpty(room.data.survey) ) { // {}, [], undefined, null
      response = await axios.patch(`${URL_RETRIEVE_UPDATE_OWNROOM}${id}/`, {
          status: 'active', 
          published_at: new Date(),
          have_survey_when_published: false 
      })
    } else {
      response = await axios.patch(`${URL_RETRIEVE_UPDATE_OWNROOM}${id}/`, {
        status: 'active', 
        published_at: new Date(),
        have_survey_when_published: true
      })
    }
    dispatch({
      type: PUBLISH_OWN_ROOM,
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

export function signUpConfirmAction(uid, token) {
  return async (dispatch) => {
    await axios.get(`${URL_SIGNUP_CONFIRM}?uid=${uid}&token=${token}`)
    dispatch({
      type: SIGN_UP_CONFIRM
    })
    // handle error in componentDidMount()
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
      dispatch(fetchGuestRooms())
      dispatch(fetchPendingRooms())
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

export function saveNewAnswer(roomId, values) {
  return async (dispatch) => {
    const response = await axios.post(URL_CREATE_ANSWER, {room: +roomId, ...values})
    dispatch({
      type: SUBMIT_ANSWER,
      payload: response
    })
  }
}

export function updateAnswer(rowId, values) {
  return async (dispatch) => {
    const response = await axios.patch(`${URL_CREATE_ANSWER}${rowId}/`, values)
    dispatch({
      type: SUBMIT_ANSWER,
      payload: response
    })
  }
}

export function fetchAnswerFromRoomId(roomId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_FETCH_ANSWER_BY_ROOM_ID}${roomId}/`)
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

export function fetchAnswersOfMe() {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL_FETCH_MY_ANSWER)
      dispatch({
        type: FETCH_MY_ANSWERS,
        payload: response
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function fetchProfile() {
  return async (dispatch) => {
    const user_id = localStorage.getItem('user_id')
    try {
      const response = await axios.get(`${URL_RETRIEVE_UPDATE_PROFILE}${user_id}/`)
      dispatch({
        type: FETCH_PROFILE,
        payload: response
      })
    } catch(error) {
      console.log(error)
    }
  }
}

export function updateProfile(values) {
  return async (dispatch) => {
    const user_id = localStorage.getItem('user_id')
    // try {
      const response = await axios.patch(`${URL_RETRIEVE_UPDATE_PROFILE}${user_id}/`, values)
      dispatch({
        type: UPDATE_PROFILE,
        payload: response
      })

    // } catch(error) {
    //   // dispatch({
    //   //   ...
    //   // })
    //   throw error // to a parent async func in a container who calls this func
    // }
  }
}

export function exportAllAnswersByRoomId(room_id) {
  return async (dispatch) => {
    const response = await axios.get(`${URL_EXPORT_ANSWERS}${room_id}`, {responseType: 'blob'})
    FileSaver.saveAs(response.data, 'export.csv')
    dispatch({
      type: EXPORT_ANSWERS_RESULT
    })
  }
}