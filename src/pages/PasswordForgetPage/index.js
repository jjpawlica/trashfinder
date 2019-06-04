import React from 'react';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonButton
} from '@ionic/react';

import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import * as ROUTES from '../../constants/routes';

import '../index.css';

const PasswordForgetPage = () => {
  return (
    <IonContent fullscreen scroll-y="false">
      <IonGrid className="content-wrapper ">
        <Header />
        <IonRow>
          <IonCol className="center-column" size="12">
            <h1 className="main-text">Forgot Password?</h1>
          </IonCol>
          <IonCol className="center-column" size="12">
            <IonItem className="input-size">
              <IonLabel position="floating" color="primary">
                Email
              </IonLabel>
              <IonInput autofocus required pattern="email" placeholder="Enter Email" type="email" />
            </IonItem>
          </IonCol>
          <IonCol className="center-column" size="12">
            <IonButton expand="block" color="primary" className="input-size">
              RESET PASSWORD
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="center-text" size="12" align-self-end>
            <IonText>Don&apos;t have account? </IonText>
            <Link to={ROUTES.SIGN_UP_EMAIL}>
              <IonText color="primary">Sing Up</IonText>
            </Link>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default PasswordForgetPage;
