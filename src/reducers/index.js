import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer'
import ownRoomsReducer from './ownRooms_reducer'
import guestRoomsReducer from './guestRooms_reducer'
import answersReducer from './answers_reducer'
import showComponentReducer from './show_component'
import errorReducer from './error_reducer'
import pendingRoomsInfoReducer from './pendingRoomsInfo_reducer'
import joinReqsInfoReducer from './joinReqsInfo_reducer'
import profileReducer from './profile_reducer'


const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  ownRooms: ownRoomsReducer,
  guestRooms: guestRoomsReducer,
  pendingRoomsInfo: pendingRoomsInfoReducer,
  joinReqsInfo: joinReqsInfoReducer,
  answers: answersReducer,
  showComponent: showComponentReducer,
  errors: errorReducer,
  profile: profileReducer
})

export default rootReducer