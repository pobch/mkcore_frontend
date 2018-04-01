import axios from 'axios'

export const AUTHENTICATED = 'authenticated'
export const AUTHEN_ERROR = 'authentication_error'

const URL_LOGIN = 'http://localhost:8000/api/auth/login'

export function logInAction(values) {
  const { email, password } = values

  return async (dispatch) => {
    try {
      const response = await axios.post(URL_LOGIN, { email, password })
      dispatch({
        type: AUTHENTICATED,
        payload: response.data
      })
    } catch(error) {
      dispatch({
        type: AUTHEN_ERROR,
        payload: error.message
      })
    }
  }
}