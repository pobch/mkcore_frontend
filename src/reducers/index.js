import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer'
import ownRoomsReducer from './ownRooms_reducer'
import guestRoomsReducer from './guestRooms_reducer'
import showComponentReducer from './show_component'
import errorReducer from './error_reducer'


const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  ownRooms: ownRoomsReducer,
  guestRooms: guestRoomsReducer,
  showComponent: showComponentReducer,
  error: errorReducer
})

export default rootReducer