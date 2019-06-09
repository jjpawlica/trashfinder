import React from 'react';

import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const WeatherTab = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pogoda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>Weather</h1>
      </IonContent>
    </>
  );
};

export default WeatherTab;
