import {FETCH_PENDING_ROOMS_INFO} from '../actions'


export default function(state = [], action) {
  switch(action.type) {
    case FETCH_PENDING_ROOMS_INFO:
      return action.payload.data
    default:
      return state
  }
}