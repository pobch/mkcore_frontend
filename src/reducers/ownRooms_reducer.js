import _ from 'lodash'
import { 
  FETCH_OWNROOMS, FETCH_OWN_ROOM, PUBLISH_OWN_ROOM,
  UPDATE_OWN_ROOM, CREATE_OWN_ROOM, DELETE_OWN_ROOM, 
  UNAUTHENTICATED, AUTHEN_ERROR 
} from '../actions'

export default function(state = [], action) {
  switch(action.type){
    case FETCH_OWNROOMS:
      return action.payload.data
    case FETCH_OWN_ROOM:
    case UPDATE_OWN_ROOM:
      const foundFirstIndex = _.findIndex(state, ['id', action.payload.data.id])
      if (foundFirstIndex < 0) { // not found
        return [action.payload.data, ...state]
      }
      const newState = [...state] // copy array
      newState[foundFirstIndex] = action.payload.data // replace new data to the same position
      return newState
    case PUBLISH_OWN_ROOM:
      const tempState = state.filter((value) => value.id !== action.payload.data.id)
      tempState.splice(0,0,action.payload.data)
      return tempState
    case CREATE_OWN_ROOM:
      return [action.payload.data, ...state]
    case DELETE_OWN_ROOM:
      return _.filter(state, (value, indx) => value.id !== action.payload)
    case UNAUTHENTICATED:
    case AUTHEN_ERROR:
      return []
    default:
      return state
  }
}