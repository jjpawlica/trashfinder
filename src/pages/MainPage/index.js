import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
  IonPage
} from '@ionic/react';

import AddPlaceTab from './tabs/add';
import PlacesTab from './tabs/places';
import PlaceTab from './tabs/place';
import WeatherTab from './tabs/weather';
import ProfileTab from './tabs/profile';
import ProfileEditTab from './tabs/edit';

const MainPage = () => {
  return (
    <IonPage>
      <Route exact path="/" render={() => <Redirect to="/places" />} />
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/:tab(add-place)" component={AddPlaceTab} />
          <Route exact path="/:tab(places)" component={PlacesTab} />
          <Route path="/:tab(places)/place/:id" component={PlaceTab} />
          <Route exact path="/:tab(weather)" component={WeatherTab} />
          <Route exact path="/:tab(profile)" component={ProfileTab} />
          <Route path="/:tab(profile)/edit" component={ProfileEditTab} />
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
