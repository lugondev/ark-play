import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { layout } from './config';

if (layout.theme === 'default') require('./sass/default.scss');
if (layout.theme === 'ark-red') require('./sass/ark-red.scss');
if (layout.theme === 'bluerple') require('./sass/bluerple.scss');
if (layout.theme === 'custom') require('./sass/custom.scss');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
