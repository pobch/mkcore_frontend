import _ from 'lodash'
import {FETCH_JOIN_REQS_OF_OWN_ROOM, ACCEPT_JOINREQ} from '../actions'


export default function(state={}, action) {
  switch(action.type) {
    case FETCH_JOIN_REQS_OF_OWN_ROOM:
      return _.keyBy(action.payload.data, 'id')
    case ACCEPT_JOINREQ:
      return _.omit(state, action.payload)
    default:
      return state
  }
}