import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { layout } from './config';

if (process.env.NODE_ENV === 'production') {
  if (process.env.REACT_APP_THEME === 'ark-red') {
    require('./sass/ark-red.scss');
  } else if (process.env.REACT_APP_THEME === 'bluerple') {
    require('./sass/bluerple.scss');
  } else if (process.env.REACT_APP_THEME === 'custom') {
    require('./sass/custom.scss');
  } else {
    require('./sass/default.scss');
  }
} else {
  if (layout.theme === 'ark-red') {
    require('./sass/ark-red.scss');
  } else if (layout.theme === 'bluerple') {
    require('./sass/bluerple.scss');
  } else if (layout.theme === 'custom') {
    require('./sass/custom.scss');
  } else {
    require('./sass/default.scss');
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
