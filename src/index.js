import React from 'react';
import ReactDOM from 'react-dom';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './components/App';

import Firebase from './components/Firebase/firebase';
import FirebaseContext from './components/Firebase/context';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// Call the element loader after the app has been rendered the first time
defineCustomElements(window);

serviceWorker.unregister();
