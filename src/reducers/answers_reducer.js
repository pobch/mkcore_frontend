import { SUBMIT_ANSWER, FETCH_ANSWER } from '../actions'

export default function(state = {}, action){
  switch(action.type) {
    case FETCH_ANSWER:
    case SUBMIT_ANSWER:
      return {...state, [action.payload.data.id]: action.payload.data}
    default:
      return state
  }
}