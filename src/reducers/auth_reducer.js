import _ from 'lodash'
import axios from 'axios'
import {
  AUTHENTICATED,
  AUTHEN_ERROR,
  AUTHEN_FACEBOOK_ERROR,
  UNAUTHENTICATED,
  CLEAR_AUTH_ERROR_MSG,
} from '../actions'

export default function(state = {}, action) {
  switch(action.type) {
    case AUTHENTICATED:
      axios.defaults.headers.common['Authorization'] = `jwt ${localStorage.getItem('token')}`
      return { authenticated: true }
    case AUTHEN_ERROR:
      delete axios.defaults.headers.common['Authorization']
      return { authenticated: false, error: action.payload }
    case CLEAR_AUTH_ERROR_MSG:
      // only clear error key, but maintain 'authenticated' status
      return _.omit(state, 'error')
    case AUTHEN_FACEBOOK_ERROR:
      return { ...state, facebookLoginError: action.error };
    case UNAUTHENTICATED:
      delete axios.defaults.headers.common['Authorization']
      return { authenticated: false }
    default:
      return state
  }
}
