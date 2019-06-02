/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { IonApp } from '@ionic/react';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import './App.css';

import Start from './pages/Start';
// import Menu from './components/Menu';

const App = () => {
  return (
    <IonApp>
      <Start />
    </IonApp>
  );
};

export default App;
