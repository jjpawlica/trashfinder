/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonSplitPane
} from '@ionic/react';

import Menu from '../../components/Navigation/Menu';

const Main = () => {
  return (
    <IonSplitPane contentId="main">
      <Menu />
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Trashfinder</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonPage>
    </IonSplitPane>
  );
};

export default Main;
