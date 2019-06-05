/* eslint-disable react/prop-types */
import React, { useCallback, useContext } from 'react';
import { IonContent, IonGrid, IonRow, IonCol, IonText, IonButton } from '@ionic/react';

import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import * as ROUTES from '../../constants/routes';

import FirebaseContext from '../../components/Firebase/context';

import '../index.css';

const SignupPageWithGoogle = ({ history }) => {
  const firebase = useContext(FirebaseContext);

  const handleSignup = useCallback(
    async event => {
      event.preventDefault();
      try {
        await firebase.auth.signInWithPopup(firebase.googleProvider);
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
      <IonGrid fixed className="content-wrapper">
        <Header />
        <IonRow>
          <IonCol className="center-column" size="12">
            <h1 className="main-text">Sign Up with Google</h1>
          </IonCol>
          <IonCol className="center-column" size="12">
            <IonButton expand="block" color="primary" className="input-size" onClick={handleSignup}>
              CREAT ACCOUNT
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="center-text" size="12">
            <IonText>Do you already have account? </IonText>
            <Link to={ROUTES.LOG_IN}>
              <IonText color="primary">Log in</IonText>
            </Link>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default withRouter(SignupPageWithGoogle);
