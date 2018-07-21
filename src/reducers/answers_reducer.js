import _ from 'lodash'
import { 
  SUBMIT_ANSWER, FETCH_ANSWER, FETCH_MY_ANSWERS, ERROR_IN_ANSWERS, 
  LEAVE_ROOM, DELETE_OWN_ROOM 
} from '../actions'

export default function(state = {}, action){
  switch(action.type) {
    case FETCH_MY_ANSWERS:
      // in this case, response.data is array type
      return _.keyBy(action.payload.data, 'id')
    case FETCH_ANSWER:
    case SUBMIT_ANSWER:
      // in this case, response.data is object type
      return {...state, [action.payload.data.id]: action.payload.data, errorMsg: null}
    case ERROR_IN_ANSWERS:
      return {...state, errorMsg: {...action.payload.data}}
    case LEAVE_ROOM:
    case DELETE_OWN_ROOM:
      return {}
    default:
      return state
  }
}