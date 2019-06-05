/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useContext, useCallback } from 'react';
import { withRouter, Route } from 'react-router';

import {
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTab,
  IonTabs,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonRouterOutlet
} from '@ionic/react';

import FirebaseContext from '../../components/Firebase/context';

import * as ROUTES from '../../constants/routes';

import '../index.css';

const Profile = ({ history }) => {
  const firebase = useContext(FirebaseContext);

  const handleLogout = useCallback(
    event => {
      event.preventDefault();
      try {
        firebase.auth.signOut();
        history.push(ROUTES.LANDING);
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history]
  );
  return (
    <IonContent>
      <IonGrid fixed className="content-wrapper">
        <IonRow>
          <IonCol className="center-column" size="12">
            <h1>USER</h1>
          </IonCol>
          <IonCol className="center-column" size="12">
            <IonButton color="primary" onClick={handleLogout}>
              Primary
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

const ProfilePage = () => {
  return (
    <IonPage>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/:tab(add-place)" component={Profile} exact />
          <Route path="/:tab(places)" component={Profile} exact />
          <Route path="/:tab(weather)" component={Profile} exact />
          <Route path="/:tab(profile)" component={Profile} exact />
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

export default withRouter(ProfilePage);
