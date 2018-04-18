import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer'
import ownRoomsReducer from './ownRooms_reducer'
import guestRoomsReducer from './guestRooms_reducer'


const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  ownRooms: ownRoomsReducer,
  guestRooms: guestRoomsReducer
})

export default rootReducer