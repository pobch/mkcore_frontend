import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import logInReducer from './login_reducer'


const rootReducer = combineReducers({
  form: formReducer,
  data: logInReducer
})

export default rootReducer