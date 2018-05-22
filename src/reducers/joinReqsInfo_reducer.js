import _ from 'lodash'
import {
  FETCH_JOIN_REQS_OF_OWN_ROOM, ACCEPT_JOINREQ, DENY_JOINREQ, 
  RESET_JOINREQS_LIST
} from '../actions'


export default function(state={}, action) {
  switch(action.type) {
    case FETCH_JOIN_REQS_OF_OWN_ROOM:
      return _.keyBy(action.payload.data, 'id')
    case ACCEPT_JOINREQ:
      return _.omit(state, action.payload)
    case DENY_JOINREQ:
      return _.omit(state, action.payload)
    case RESET_JOINREQS_LIST:
      return {}
    default:
      return state
  }
}