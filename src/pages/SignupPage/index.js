/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
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

import { withRouter } from 'react-router';

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
    } else {
      setInvalid(true);
    }
  }, [email, passwordOne, passwordTwo]);

  const handleSignup = async event => {
    event.preventDefault();
    try {
      const response = await firebase.auth.createUserWithEmailAndPassword(email, passwordOne);
      await firebase.db
        .collection('users')
        .doc(response.user.uid)
        .set({ createAt: firebase.timestamp });
      history.push(ROUTES.LANDING);
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
                Jesteś już zalogowany
              </h1>
            </IonCol>
            <IonCol size="12">
              <IonButton
                expand="block"
                fill="clear"
                color="primary"
                onClick={() => history.push(ROUTES.LANDING)}
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
                  Hasło
                </IonLabel>
                <IonInput
                  required
                  placeholder="Hasło"
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
                  Potwierdź hasło
                </IonLabel>
                <IonInput
                  required
                  placeholder="Potwierdź hasło"
                  type="password"
                  name="confirm"
                  value={passwordTwo}
                  onIonChange={e => setPasswordTwo(e.currentTarget.value)}
                />
              </IonItem>
            </IonCol>
            <IonCol size="10">
              <IonButton expand="block" color="primary" type="submit" disabled={invalid}>
                ZALOGUJ
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol size="12">
              <IonText>
                <p className="text-center">
                  Do you already have account?{' '}
                  <IonText color="primary" onClick={() => history.push(ROUTES.LOG_IN)}>
                    Log in
                  </IonText>
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
