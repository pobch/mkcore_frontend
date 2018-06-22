import _ from 'lodash'
import {
  FETCH_JOINREQS_OF_OWN_ROOM, ACCEPT_JOINREQ, ACCEPT_ALL_JOINREQS, 
  DENY_JOINREQ, RESET_JOINREQS_LIST, BULK_CREATE_JOINREQS
} from '../actions'


// state contains many join requests of only ONE room
export default function(state={}, action) {
  switch(action.type) {
    case FETCH_JOINREQS_OF_OWN_ROOM:
    case BULK_CREATE_JOINREQS:
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