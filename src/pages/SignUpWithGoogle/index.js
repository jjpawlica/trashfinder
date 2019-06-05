/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { IonContent, IonGrid, IonRow, IonCol, IonText, IonButton } from '@ionic/react';

import { withRouter } from 'react-router';

import Header from '../../components/Header';
import * as ROUTES from '../../constants/routes';

import FirebaseContext from '../../components/Firebase/context';
import UserContext from '../../components/User/context';

const SignupPageWithGoogle = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const [error, setError] = useState('');

  const handleSignup = async event => {
    event.preventDefault();
    try {
      await firebase.auth.signInWithPopup(firebase.googleProvider);
      history.push(ROUTES.MAIN);
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return (
      <IonContent fullscreen>
        <IonGrid fixed>
          <Header />
          <IonRow justify-content-center>
            <IonCol size="12">
              <h1 style={{ marginTop: '20vh' }} className="text-margin-bottom text-center">
                You are already logged in
              </h1>
            </IonCol>
            <IonCol size="12">
              <IonButton
                expand="block"
                fill="clear"
                color="primary"
                onClick={() => history.push(ROUTES.MAIN)}
              >
                Go to App
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
  }

  return (
    <IonContent fullscreen scroll-y="false">
      <IonGrid fixed>
        <Header />
        <IonRow justify-content-center>
          <IonCol size="12">
            <h1 className="text-bottom-margin text-center">Sign Up with Google</h1>
            {error && (
              <IonText color="danger">
                <p className="text-center">{error}</p>
              </IonText>
            )}
          </IonCol>
          <IonCol size="10">
            <IonButton expand="block" color="primary" onClick={handleSignup}>
              CREAT ACCOUNT
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow justify-content-center>
          <IonCol size="10">
            <IonText>
              <p className="text-center">
                Do you already have account?{' '}
                <IonText color="primary" onClick={() => history.push(ROUTES.SIGN_UP_EMAIL)}>
                  Log in
                </IonText>
              </p>
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default withRouter(SignupPageWithGoogle);
