/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';

import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';

const UserInfo = () => {
  const user = { email: 'test@test.com' };
  return (
    <IonContent fullscreen scroll-y="false">
      <IonGrid fixed className="content-wrapper">
        <IonRow>
          <IonCol className="center-column" size="12">
            <h1 className="main-text">{user.email}</h1>
          </IonCol>
          <IonCol className="center-column" size="12">
            <IonButton expand="block" color="primary" className="input-size" type="submit">
              LOG IN
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

const MainPage = () => {
  return (
    <IonPage>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/:tab(add-place)" component={UserInfo} exact />
          <Route path="/:tab(places)" component={UserInfo} exact />
          <Route path="/:tab(places)/place/:id" component={UserInfo} />
          <Route path="/:tab(weather)" component={UserInfo} />
          <Route path="/:tab(profile)" component={UserInfo} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="add-place" href="/add-place">
            <IonIcon name="add-circle" />
            <IonLabel>Dodaj</IonLabel>
          </IonTabButton>
          <IonTabButton tab="places" href="/places">
            <IonIcon name="map" />
            <IonLabel>Miejsca</IonLabel>
          </IonTabButton>
          <IonTabButton tab="weather" href="/weather">
            <IonIcon name="partly-sunny" />
            <IonLabel>Pogoda</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon name="person" />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default MainPage;
