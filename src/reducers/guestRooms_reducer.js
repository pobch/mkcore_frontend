import { FETCH_GUESTROOMS, UNAUTHENTICATED, AUTHEN_ERROR, JOIN_ROOM } from '../actions'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_GUESTROOMS:
      return action.payload.data // array of Room objects
    case JOIN_ROOM:
      return [action.payload.data, ...state]
    case UNAUTHENTICATED:
    case AUTHEN_ERROR:
      return []
    default:
      return state
  }
}