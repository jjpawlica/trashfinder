/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { IonApp } from '@ionic/react';

import Main from './pages/Main';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

const App = () => {
  return (
    <IonApp>
      <Main />
    </IonApp>
  );
};

export default App;
