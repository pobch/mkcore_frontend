import _ from 'lodash'
import {
  FETCH_JOIN_REQS_OF_OWN_ROOM, ACCEPT_JOINREQ, ACCEPT_ALL_JOINREQS, 
  DENY_JOINREQ, RESET_JOINREQS_LIST
} from '../actions'


export default function(state={}, action) {
  switch(action.type) {
    case FETCH_JOIN_REQS_OF_OWN_ROOM:
      return _.keyBy(action.payload.data, 'id') // payload.data is response array
    case ACCEPT_JOINREQ:
      return {...state, [action.payload.data.id]: action.payload.data} // payload.data is response object
    case ACCEPT_ALL_JOINREQS:
      const acceptedJoinReqsObj = _.keyBy(action.payload.data, 'id') // payload.data is response array
      return {...state, ...acceptedJoinReqsObj}
    case DENY_JOINREQ:
      return _.omit(state, action.payload) // payload is only id
    case RESET_JOINREQS_LIST:
      return {}
    default:
      return state
  }
}