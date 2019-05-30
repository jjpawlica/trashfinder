/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { IonContent, IonGrid, IonIcon, IonText, IonButton, IonRow, IonCol } from '@ionic/react';

import './LandingPage.css';

const LandingPage = () => {
  return (
    <IonContent fullscreen scroll-y="false">
      <IonGrid fixed className="content-wrapper">
        <IonRow align-items-stretch>
          <IonCol className="center-column">
            <h1>Trashfinder</h1>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="center-column">
            <IonIcon name="leaf" className="logo" />
          </IonCol>
        </IonRow>
        <IonRow align-items-stretch>
          <IonCol className="center-column">
            <IonText className="center-text">
              Lorem ipsum dolor amet messenger bag tilde tote bag authentic prism. Narwhal plaid
              snackwave umami activated charcoal kitsch put a bird on it literally flannel.
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow align-items-stretch>
          <IonCol>
            <IonButton expand="block">Log In</IonButton>
            <IonButton expand="block">Sign Up with Email</IonButton>
            <IonButton expand="block">Sing up with Google</IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default LandingPage;
