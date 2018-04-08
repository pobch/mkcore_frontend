import _ from 'lodash'
import { FETCH_OWNROOMS, FETCH_ERROR, UNAUTHENTICATED, AUTHEN_ERROR } from '../actions'

export default function(state = [], action) {
  switch(action.type){
    case FETCH_OWNROOMS:
      return action.payload.data
    case FETCH_ERROR:
      return [ action.payload.data ]
    case UNAUTHENTICATED:
      return []
    case AUTHEN_ERROR:
      return []
    default:
      return state
  }
}