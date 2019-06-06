/* eslint-disable react/prop-types */
import React from 'react';

import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const PlaceTab = ({ match }) => {
  const { id } = match.params;
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Places</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>ID: {id}</h1>
      </IonContent>
    </>
  );
};

export default PlaceTab;
