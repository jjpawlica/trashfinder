/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { IonApp } from '@ionic/react';

import LandingPage from '../pages/LandingPage/LandingPage';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

const App = () => {
  return (
    <IonApp>
      <LandingPage />
    </IonApp>
  );
};

export default App;
