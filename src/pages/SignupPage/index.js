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

import '../index.css';

const SignupPage = ({ history }) => {
  const firebase = useContext(FirebaseContext);

  const handleSignup = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase.auth.createUserWithEmailAndPassword(email.value, password.value);
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
      <form onSubmit={handleSignup}>
        <IonGrid fixed className="content-wrapper">
          <Header />
          <IonRow>
            <IonCol className="center-column" size="12">
              <h1 className="main-text">Sing Up</h1>
            </IonCol>
            <IonCol className="center-column" size="12">
              <IonItem className="input-size">
                <IonLabel position="floating" color="primary">
                  Email
                </IonLabel>
                <IonInput required placeholder="Enter Email" type="email" name="email" />
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
                SIGN UP
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
      </form>
    </IonContent>
  );
};

export default withRouter(SignupPage);
