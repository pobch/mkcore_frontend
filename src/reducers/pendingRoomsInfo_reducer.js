import {FETCH_PENDING_ROOMS_INFO, DENY_JOINREQ} from '../actions'


export default function(state = [], action) {
  switch(action.type) {
    case FETCH_PENDING_ROOMS_INFO:
      return action.payload.data
    case DENY_JOINREQ:
      return state.filter((value) => value.room === action.payload)
    default:
      return state
  }
}