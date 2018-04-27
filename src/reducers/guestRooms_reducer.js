import _ from 'lodash'
import { FETCH_GUESTROOMS, UNAUTHENTICATED, AUTHEN_ERROR, JOIN_ROOM, LEAVE_ROOM } from '../actions'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_GUESTROOMS:
      return action.payload.data // array of Room objects
    case JOIN_ROOM:
      return [action.payload.data, ...state]
    case LEAVE_ROOM:
      return _.filter(state, (value) => value.id !== action.payload)
    case UNAUTHENTICATED:
    case AUTHEN_ERROR:
      return []
    default:
      return state
  }
}