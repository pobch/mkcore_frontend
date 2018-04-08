import _ from 'lodash'
import axios from 'axios'
import { AUTHENTICATED, AUTHEN_ERROR, UNAUTHENTICATED, CLEAR_ERROR } from '../actions'


export default function(state = {}, action) {
  switch(action.type) {
    case AUTHENTICATED:
      axios.defaults.headers.common['Authorization'] = `jwt ${localStorage.getItem('token')}`
      return { authenticated: true }
    case AUTHEN_ERROR:
      delete axios.defaults.headers.common['Authorization']
      return { authenticated: false, error: action.payload }
    case CLEAR_ERROR:
      // only clear error key, but maintain 'authenticated' status
      return _.omit(state, 'error')
    case UNAUTHENTICATED:
      delete axios.defaults.headers.common['Authorization']
      return { authenticated: false }
    default:
      return state
  }
}