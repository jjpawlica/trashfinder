/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useState } from 'react';
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

import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import * as ROUTES from '../../constants/routes';

import '../index.css';

import FirebaseContext from '../../components/Firebase/context';

const LoginPage = ({ history }) => {
  const firebase = useContext(FirebaseContext);

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase.auth.signInWithEmailAndPassword(email.value, password.value);
        history.push(ROUTES.MAIN);
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history]
  );

  // If user then redirect to main app
  // if (firebase.auth.currentUser) {
  //   return <Redirect to={ROUTES.MAIN} />;
  // }

  return (
    <IonContent fullscreen scroll-y="false">
      <form onSubmit={handleLogin}>
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
                <IonText color="primary">Sign Up</IonText>
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </IonContent>
  );
};

export default withRouter(LoginPage);
