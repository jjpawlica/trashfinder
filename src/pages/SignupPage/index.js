/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useState, useEffect } from 'react';
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

const SignupPage = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [invalid, setInvalid] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (email !== '' && passwordOne !== '' && passwordTwo !== '' && passwordOne === passwordTwo) {
      setInvalid(false);
    }
  }, [email, passwordOne, passwordTwo]);

  const handleSignup = async event => {
    event.preventDefault();
    try {
      console.log(email, passwordOne);
      await firebase.auth.createUserWithEmailAndPassword(email, passwordOne);
      history.push(ROUTES.LANDING);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      console.log(error);
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
              <Link to={ROUTES.MAIN}>
                <IonButton expand="block" fill="clear" color="primary">
                  Go to App
                </IonButton>
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
    // Change later to redirect to main app stack
    // return <Redirect to={ROUTES.MAIN} />;
  }

  return (
    <IonContent fullscreen scroll-y="false">
      <form onSubmit={handleSignup}>
        <IonGrid fixed>
          <Header />
          <IonRow justify-content-center>
            <IonCol size="12">
              <h1 className="text-center text-bottom-margin">Sign Up</h1>
              {error && (
                <IonText color="danger">
                  <p className="text-center">{error}</p>
                </IonText>
              )}
            </IonCol>
            <IonCol size="10">
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Email
                </IonLabel>
                <IonInput
                  required
                  placeholder="Enter Email"
                  type="email"
                  name="email"
                  value={email}
                  onIonChange={e => setEmail(e.currentTarget.value)}
                />
              </IonItem>
            </IonCol>
            <IonCol size="10">
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Password
                </IonLabel>
                <IonInput
                  required
                  placeholder="Eneter Password"
                  type="password"
                  name="password"
                  value={passwordOne}
                  onIonChange={e => setPasswordOne(e.currentTarget.value)}
                />
              </IonItem>
            </IonCol>
            <IonCol size="10">
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Confirm Password
                </IonLabel>
                <IonInput
                  required
                  placeholder="Confirm Password"
                  type="password"
                  name="confirm"
                  value={passwordTwo}
                  onIonChange={e => setPasswordTwo(e.currentTarget.value)}
                />
              </IonItem>
            </IonCol>
            <IonCol size="10">
              <IonButton expand="block" color="primary" type="submit" disabled={invalid}>
                SIGN UP
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol size="12">
              <IonText>
                <p className="text-center">
                  Do you already have account?{' '}
                  <Link to={ROUTES.LOG_IN}>
                    <IonText color="primary">Log in</IonText>
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

export default withRouter(SignupPage);
