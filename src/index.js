import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers'
import { AUTHENTICATED } from './actions'


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token')

if(token) {
  // console.log('Token payload :', JSON.parse(window.atob(token.split('.')[1])))
  store.dispatch({ type: AUTHENTICATED })
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
  
registerServiceWorker();
