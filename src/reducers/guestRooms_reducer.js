import { FETCH_GUESTROOMS, FETCH_GUEST_ERROR, UNAUTHENTICATED, AUTHEN_ERROR } from '../actions'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_GUESTROOMS:
      return action.payload.data // array of Room objects
    case FETCH_GUEST_ERROR:
      return [ action.payload.data ] // [ { detail: 'error bla bla bla'} ]
    case UNAUTHENTICATED:
    case AUTHEN_ERROR:
      return []
    default:
      return state
  }
}