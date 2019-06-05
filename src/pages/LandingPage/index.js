/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Link } from 'react-router-dom';

import { IonContent, IonGrid, IonText, IonButton, IonRow, IonCol } from '@ionic/react';

import * as ROUTES from '../../constants/routes';

import logo from '../../images/logo.svg';

import startImage from '../../images/start-image.svg';

const LandingPage = () => {
  return (
    <IonContent fullscreen>
      <IonGrid fixed>
        <IonRow>
          <IonCol size="12">
            <img src={logo} alt="Logo" className="app-logo" />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12">
            <IonText>
              <h1 className="text-center">
                Pomóż posprzątać
                <br />
                swoją okolicę!
              </h1>
            </IonText>
          </IonCol>
          <IonCol size="12">
            <img src={startImage} className="App-logo" alt="Start" />
          </IonCol>
        </IonRow>
        <IonRow justify-content-center>
          <IonCol size="10">
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
          <IonCol size="12">
            <IonText>
              <p className="text-center text-small">
                &copy; Jakub Pawlica, Agnieszka Chlebda, Michał Kowalik, Dawid Łysiak <br />{' '}
                Aplikacja została stworzona jako praca zaliczenowa na przedmiot Bogate Aplikacje
                Internetowe.
              </p>
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default LandingPage;
