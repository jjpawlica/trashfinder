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

const LoginPage = () => {
  const handleSubmit = event => {
    event.preventDefault();
    const { email } = event.target.elements;
    console.log(email.value);
  };
  return (
    <IonContent fullscreen scroll-y="false">
      <form onSubmit={handleSubmit}>
        <IonGrid fixed className="content-wrapper">
          <Header />
          <IonRow>
            <IonCol className="center-column" size="12">
              <h1 className="main-text">Log In</h1>
            </IonCol>
            <IonCol className="center-column" size="12">
              <IonItem className="input-size">
                <IonLabel position="floating" color="primary">
                  Email
                </IonLabel>
                <IonInput autofocus required placeholder="Enter Email" type="email" name="email" />
              </IonItem>
            </IonCol>
            <IonCol className="center-column" size="12">
              <IonItem className="input-size">
                <IonLabel position="floating" color="primary">
                  Password
                </IonLabel>
                <IonInput required placeholder="Eneter Password" type="password" name="password" />
              </IonItem>
            </IonCol>
            <IonCol className="center-column" size="12">
              <IonButton expand="block" color="primary" className="input-size" type="submit">
                LOG IN
              </IonButton>
            </IonCol>
            <IonCol className="center-column" size="12">
              <Link to={ROUTES.PASSWORD_FORGET}>
                <IonButton expand="block" fill="clear" color="primary">
                  Forgot Password?
                </IonButton>
              </Link>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="center-text">
              <IonText>Don&apos;t have account? </IonText>
              <Link to={ROUTES.SIGN_UP_EMAIL}>
                <IonText color="primary">Sing Up</IonText>
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </IonContent>
  );
};

export default LoginPage;
