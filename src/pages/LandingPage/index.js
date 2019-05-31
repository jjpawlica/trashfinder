/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Link } from 'react-router-dom';

import { IonContent, IonGrid, IonIcon, IonText, IonButton, IonRow, IonCol } from '@ionic/react';

import * as ROUTES from '../../constants/routes';

import '../index.css';

const LandingPage = () => {
  return (
    <IonContent fullscreen scroll-y="false">
      <IonGrid fixed className="content-wrapper">
        <IonRow>
          <IonCol className="center-column" size="12">
            <IonIcon name="leaf" className="logo" color="success" />
          </IonCol>
          <IonCol className="center-column" size="12">
            <h1 className="main-text">Trashfinder</h1>
          </IonCol>
          <IonCol className="center-column" size="12">
            <IonText className="center-text">
              Lorem ipsum dolor amet messenger bag tilde tote bag authentic prism. Narwhal plaid
              snackwave umami activated charcoal kitsch put a bird on it literally flannel.
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12">
            <Link to={ROUTES.LOG_IN}>
              <IonButton expand="block">Log In</IonButton>
            </Link>
            <Link to={ROUTES.SIGN_UP_EMAIL}>
              <IonButton expand="block">Sign Up with Email</IonButton>
            </Link>
            <Link to={ROUTES.SIGN_UP_GOOGLE}>
              <IonButton expand="block">Sing up with Google</IonButton>
            </Link>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default LandingPage;
