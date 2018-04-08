import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer'
import ownRoomsReducer from './ownRooms_reducer'


const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  ownRooms: ownRoomsReducer
})

export default rootReducer