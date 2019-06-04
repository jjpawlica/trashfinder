/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Link } from 'react-router-dom';

import { IonContent, IonGrid, IonText, IonButton, IonRow, IonCol } from '@ionic/react';

import * as ROUTES from '../../constants/routes';

import '../index.css';

import logo from '../../images/logo.svg';

import startImage from '../../images/start-image.svg';

const LandingPage = () => {
  return (
    <IonContent fullscreen scroll-y="false">
      <IonGrid fixed className="content-wrapper">
        <IonRow>
          <IonCol className="center-column" size="12">
            <img src={logo} alt="Logo" className="app-logo" />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="center-column" size="12">
            <IonText className="center-text">
              <h1>
                Pomóż posprzątać
                <br />
                swoją okolicę!
              </h1>
            </IonText>
          </IonCol>
          <IonCol className="center-column" size="12">
            <img src={startImage} className="App-logo" alt="Start" />
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
          <IonCol className="center-column" size="12">
            <IonText className="small-text center-text">
              &copy; Jakub Pawlica, Agnieszka Chlebda, Michał Kowalik, Dawid Łysiak <br /> Aplikacja
              została stworzona jako praca zaliczenowa na przedmiot Bogate Aplikacje Internetowe.
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default LandingPage;
