import _ from 'lodash'
import { 
  ERROR_IN_GUESTROOMS, ERROR_IN_OWNROOMS, ERROR_IN_ANSWERS,
  CLEAR_ERROR_MSG, JOIN_ROOM, CREATE_OWN_ROOM, FETCH_OWNROOMS, FETCH_GUESTROOMS
} from '../actions'


export default function(state={}, action) {
  switch(action.type) {
    case ERROR_IN_GUESTROOMS:
      // In case of 'Not found' error, 
      //   action.payload.data = {detail: 'Not Found bla bla'}
      return { ...state, guestRoomsError: _.isEmpty(action.payload.data) ? 'Something went wrong' : action.payload.data }
    case ERROR_IN_OWNROOMS:
      // In case of 'room_code' is not unique (Validation Error), 
      //   action.payload.data = {room_code: ['room with this room code already exists.']}
      return { ...state, ownRoomsError: _.isEmpty(action.payload.data) ? 'Something went wrong' : action.payload.data }
    case ERROR_IN_ANSWERS:
      // e.g., action.payload.data = {detail: 'Not found.'}
      return { ...state, answersError: _.isEmpty(action.payload.data) ? 'Something went wrong' : action.payload.data}
    case CREATE_OWN_ROOM:
    case JOIN_ROOM:
    case CLEAR_ERROR_MSG:
    case FETCH_OWNROOMS:
    case FETCH_GUESTROOMS:
      return {}
    default:
      return state
  }
}