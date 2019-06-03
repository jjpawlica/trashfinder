/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import {
  IonContent,
  IonGrid,
  // IonIcon,
  IonText,
  IonButton,
  IonRow,
  IonCol
} from '@ionic/react';

import './Start.css';

import logo from '../images/logo.svg';
import startImage from '../images/start-image.svg';

const Start = () => {
  return (
    <IonContent fullscreen scroll-y="false">
      <IonGrid fixed className="content-wrapper">
        <IonRow align-items-stretch>
          <IonCol className="center-column">
            <img src={logo} className="App-logo" alt="Logo" />
          </IonCol>
        </IonRow>
        <IonRow align-items-stretch>
          <IonCol className="center-column center-text">
            <h1>Pomóż posprzątać<br />swoją okolicę!</h1>
          </IonCol>
        </IonRow>
        <IonRow align-items-stretch>
          <IonCol className="center-column">
            <img src={startImage} className="App-logo" alt="Start" />
          </IonCol>
        </IonRow>
        {/* <IonRow>
          <IonCol className="center-column">
            <IonIcon name="leaf" className="logo" />
          </IonCol>
        </IonRow> */}
        <IonRow align-items-stretch>
          <IonCol>
            <IonButton href="/main" expand="block">Logowanie</IonButton>
            <IonButton expand="block">Rejestracja przez email</IonButton>
            <IonButton expand="block">Rejestracja przez Google</IonButton>
          </IonCol>
        </IonRow>
        <IonRow align-items-stretch>
          <IonCol className="center-column">
            <IonText className="small-text center-text">
              &copy; Jakub Pawlica, Agnieszka Chlebda, Michał Kowalik, Dawid Łysiak
              <br />
              Aplikacja została stworzona jako praca zaliczenowa na przedmiot "Bogate Aplikacje Internetowe".
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default Start;
