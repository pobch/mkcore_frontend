import _ from 'lodash'
import { 
  FETCH_OWNROOMS, FETCH_OWN_ROOM, FETCH_OWN_ERROR, 
  UPDATE_OWN_ROOM, CREATE_ROOM, DELETE_OWN_ROOM, 
  UNAUTHENTICATED, AUTHEN_ERROR 
} from '../actions'

export default function(state = [], action) {
  switch(action.type){
    case FETCH_OWNROOMS:
      return action.payload.data
    case FETCH_OWN_ROOM:
    case UPDATE_OWN_ROOM:
      const foundIndex = _.findIndex(state, ['id', action.payload.data.id])
      if (foundIndex < 0) { // not found
        return [action.payload.data, ...state]
      }
      const newState = [...state] // copy array
      newState[foundIndex] = action.payload.data
      return newState
    case CREATE_ROOM:
      return [action.payload.data, ...state]
    case DELETE_OWN_ROOM:
      return _.filter(state, (value, indx) => value.id !== action.payload)
    case FETCH_OWN_ERROR:
      return [ action.payload.data ]
    case UNAUTHENTICATED:
    case AUTHEN_ERROR:
      return []
    default:
      return state
  }
}