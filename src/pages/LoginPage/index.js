/* eslint-disable react/prop-types */
import React, { useCallback, useContext } from 'react';
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

import FirebaseContext from '../../components/Firebase/context';
import UserContext from '../../components/User/context';

const LoginPage = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase.auth.signInWithEmailAndPassword(email.value, password.value);
        history.push(ROUTES.LANDING);
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history]
  );

  if (user) {
    return (
      <IonContent fullscreen>
        <IonGrid fixed>
          <Header />
          <IonRow justify-content-center>
            <IonCol size="12">
              <h1 style={{ marginTop: '25vh' }} className="text-margin-bottom text-center">
                You are already logged in
              </h1>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
    // Change later to redirect to main app stack
    // return <Redirect to={ROUTES.MAIN} />;
  }

  return (
    <IonContent fullscreen>
      <form onSubmit={handleLogin}>
        <IonGrid fixed>
          <Header />
          <IonRow justify-content-center>
            <IonCol size="12">
              <h1 className="text-margin-bottom text-center">Log In</h1>
            </IonCol>
            <IonCol size="10">
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Email
                </IonLabel>
                <IonInput autofocus required placeholder="Enter Email" type="email" name="email" />
              </IonItem>
            </IonCol>
            <IonCol size="10">
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Password
                </IonLabel>
                <IonInput required placeholder="Eneter Password" type="password" name="password" />
              </IonItem>
            </IonCol>
            <IonCol size="10">
              <IonButton expand="block" color="primary" type="submit">
                LOG IN
              </IonButton>
            </IonCol>
            <IonCol size="12">
              <Link to={ROUTES.PASSWORD_FORGET}>
                <IonButton expand="block" fill="clear" color="primary">
                  Forgot Password?
                </IonButton>
              </Link>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol>
              <IonText>
                <p className="text-center">
                  Don&apos;t have account?{' '}
                  <Link to={ROUTES.SIGN_UP_EMAIL}>
                    <IonText color="primary">Sign Up</IonText>
                  </Link>
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </IonContent>
  );
};

export default withRouter(LoginPage);
