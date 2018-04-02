import _ from 'lodash'
import { AUTHENTICATED, AUTHEN_ERROR, UNAUTHENTICATED, CLEAR_ERROR } from '../actions'


export default function(state = {}, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return { authenticated: true }
    case AUTHEN_ERROR:
      return { authenticated: false, error: action.payload }
    case CLEAR_ERROR:
      return _.omit(state, 'error')
    default:
      return state
  }
}