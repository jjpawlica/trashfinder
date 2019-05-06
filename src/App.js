/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import {
  IonApp,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonSplitPane
} from '@ionic/react';
import Menu from './components/Menu';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

const App = () => {
  return (
    <IonApp>
      <IonSplitPane contentId="main">
        <Menu />
        <IonPage id="main">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Signup</IonTitle>
            </IonToolbar>
          </IonHeader>
        </IonPage>
      </IonSplitPane>
    </IonApp>
  );
};

export default App;
