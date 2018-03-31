import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers'


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
  
registerServiceWorker();
