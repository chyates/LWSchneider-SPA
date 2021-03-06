import React from 'react';
import ReactDOM from 'react-dom';

//Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css/normalize.css';
// import './styles/base/fonts.scss';
import './styles/styles.scss';

import AppRouter from './routers/AppRouter';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import windstop from './reducers/windstop'; 

const allReducers = combineReducers({
  windstop: windstop
})

const store = createStore(
  allReducers,
  window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(<Provider store={store} ><AppRouter /></Provider>, document.getElementById('app'));
