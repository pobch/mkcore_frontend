import { AUTHENTICATED, AUTHEN_ERROR } from '../actions'


export default function(state = {}, action) {
  switch(action.type){
    case AUTHENTICATED:
      return { ...state, ...action.payload }
    case AUTHEN_ERROR:
      return { ...state, token: action.payload }
    default:
      return state
  }
}