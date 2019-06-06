import React from 'react';

import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const ProfileTab = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>Profile</h1>
      </IonContent>
    </>
  );
};

export default ProfileTab;
