/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';

import {
  IonApp,
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
          <Route path="/:tab(schedule)" component={UserInfo} exact />
          <Route path="/:tab(speakers)" component={UserInfo} exact />
          <Route path="/:tab(speakers)/speaker/:id" component={UserInfo} />
          <Route path="/:tab(schedule|speakers)/sessions/:id" component={UserInfo} />
          <Route path="/:tab(map)" component={UserInfo} />
          <Route path="/:tab(about)" component={UserInfo} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="schedule" href="/schedule">
            <IonIcon name="calendar" />
            <IonLabel>Schedule</IonLabel>
          </IonTabButton>
          <IonTabButton tab="speakers" href="/speakers">
            <IonIcon name="contacts" />
            <IonLabel>Speakers</IonLabel>
          </IonTabButton>
          <IonTabButton tab="map" href="/map">
            <IonIcon name="map" />
            <IonLabel>Map</IonLabel>
          </IonTabButton>
          <IonTabButton tab="about" href="/about">
            <IonIcon name="information-circle" />
            <IonLabel>About</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default MainPage;
