import React from 'react';

import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const AddPlaceTab = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Place</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>Add Place</h1>
      </IonContent>
    </>
  );
};

export default AddPlaceTab;
