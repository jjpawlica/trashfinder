import React from 'react';

import { IonIcon, IonLabel, IonPage, IonTabBar, IonTabButton, IonTabs, IonTab } from '@ionic/react';

const MainPage = () => {
  return (
    <IonPage>
      <IonTabs
        ionTabsDidChange={() => {
          alert('ionTabsDidChange');
        }}
        ionTabsWillChange={() => {
          alert('ionTabsWillChange');
        }}
      >
        <IonTab tab="add-place">
          <h1>ADD PLACE</h1>
        </IonTab>
        <IonTab tab="places">
          <h1>PLACES</h1>
        </IonTab>
        <IonTab tab="weather">
          <h1>WEATHER</h1>
        </IonTab>
        <IonTab tab="profile">
          <h1>PROFILE</h1>
        </IonTab>

        <IonTabBar slot="bottom">
          <IonTabButton tab="add-place">
            <IonIcon name="add-circle" />
            <IonLabel>Dodaj</IonLabel>
          </IonTabButton>
          <IonTabButton tab="places">
            <IonIcon name="map" />
            <IonLabel>Miejsca</IonLabel>
          </IonTabButton>
          <IonTabButton tab="weather">
            <IonIcon name="partly-sunny" />
            <IonLabel>Pogoda</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile">
            <IonIcon name="person" />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default MainPage;
