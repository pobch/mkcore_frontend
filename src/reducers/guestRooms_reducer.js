import _ from 'lodash'
import { 
  FETCH_GUESTROOMS, UNAUTHENTICATED, AUTHEN_ERROR, 
  LEAVE_ROOM, DELETE_OWN_ROOM, FETCH_GUEST_ROOM
} from '../actions'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_GUESTROOMS:
      return action.payload.data // array of Room objects
    case FETCH_GUEST_ROOM:
      const foundFirstIndex = _.findIndex(state, ['id', action.payload.data.id])
      if (foundFirstIndex < 0) { // not found
        return [action.payload.data, ...state]
      }
      const newState = [...state] // copy array
      newState[foundFirstIndex] = action.payload.data // replace new data to the same position
      return newState
    case LEAVE_ROOM:
    case DELETE_OWN_ROOM:
      return _.filter(state, (value) => value.id !== action.payload)
    case UNAUTHENTICATED:
    case AUTHEN_ERROR:
      return []
    default:
      return state
  }
}