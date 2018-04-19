import { SHOW_COMPONENT, HIDE_COMPONENT } from '../actions'

export default function(state = null, action) {
  switch(action.type) {
    case SHOW_COMPONENT:
      return true
    case HIDE_COMPONENT:
      return false
    default:
      return state
  }
}