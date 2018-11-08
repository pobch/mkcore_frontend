import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import './index.css';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary'
import reducers from './reducers'
import { AUTHENTICATED } from './actions'


const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk))) 

const token = localStorage.getItem('token')

if(token) {
  // console.log('Token payload :', JSON.parse(window.atob(token.split('.')[1])))
  store.dispatch({ type: AUTHENTICATED })
}

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'));
