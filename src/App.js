/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { IonApp } from '@ionic/react';

import Start from './pages/Start';
// import Menu from './components/Menu';

import './App.css';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

const App = () => {
  return (
    <IonApp>
      <Start />
    </IonApp>
  );
};

export default App;
