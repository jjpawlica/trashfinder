/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState } from 'react';
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (email !== '' && password !== '') {
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  }, [email, password]);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      await firebase.auth.signInWithEmailAndPassword(email, password);
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
              <Link to={ROUTES.MAIN}>
                <IonButton expand="block" fill="clear" color="primary">
                  Przejdź do aplikacji
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
    <IonContent fullscreen>
      <form onSubmit={handleLogin}>
        <IonGrid fixed>
          <Header />
          <IonRow justify-content-center>
            <IonCol size="12">
              <h1 className="text-margin-bottom text-center">Zaloguj</h1>
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
                  autofocus
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
                  placeholder="Eneter Password"
                  type="password"
                  name="password"
                  value={password}
                  onIonChange={e => setPassword(e.currentTarget.value)}
                />
              </IonItem>
            </IonCol>
            <IonCol size="10">
              <IonButton expand="block" color="primary" type="submit" disabled={invalid}>
                ZALOGUJ
              </IonButton>
            </IonCol>
            <IonCol size="12">
              <Link to={ROUTES.PASSWORD_FORGET}>
                <IonButton expand="block" fill="clear" color="primary">
                  Zapomniałeś hasła?
                </IonButton>
              </Link>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol>
              <IonText>
                <p className="text-center">
                  Nie masz konta?{' '}
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
