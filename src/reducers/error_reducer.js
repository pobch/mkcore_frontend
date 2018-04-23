import _ from 'lodash'
import { FETCH_GUEST_ERROR, RESET_ERROR, JOIN_ROOM } from '../actions'


export default function(state={}, action) {
  switch(action.type) {
    case FETCH_GUEST_ERROR:
      const { detail } = action.payload.data // detail = 'Not Found bla bla'
      return { ...state, [FETCH_GUEST_ERROR]: detail }
    case JOIN_ROOM:
      return _.omit(state, FETCH_GUEST_ERROR) 
    case RESET_ERROR:
      return {}
    default:
      return state
  }
}