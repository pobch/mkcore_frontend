import { SUBMIT_ANSWER, FETCH_ANSWER, LEAVE_ROOM, DELETE_OWN_ROOM } from '../actions'

export default function(state = {}, action){
  switch(action.type) {
    case FETCH_ANSWER:
    case SUBMIT_ANSWER:
      return {...state, [action.payload.data.id]: action.payload.data}
    case LEAVE_ROOM:
    case DELETE_OWN_ROOM:
      return {}
    default:
      return state
  }
}