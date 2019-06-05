/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { IonContent, IonGrid, IonRow, IonCol, IonText, IonButton } from '@ionic/react';

import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

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
    <IonContent fullscreen scroll-y="false">
      <IonGrid fixed>
        <Header />
        <IonRow justify-content-center>
          <IonCol size="12">
            <h1 className="text-bottom-margin text-center">Rejestracja przez Google</h1>
            {error && (
              <IonText color="danger">
                <p className="text-center">{error}</p>
              </IonText>
            )}
          </IonCol>
          <IonCol size="10">
            <IonButton expand="block" color="primary" onClick={handleSignup}>
              UTWÓRZ KONTO
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow justify-content-center>
          <IonCol size="10">
            <IonText>
              <p className="text-center">
                Czy posiadasz już konto?{' '}
                <Link to={ROUTES.LOG_IN}>
                  <IonText color="primary">Zaloguj</IonText>
                </Link>
              </p>
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default withRouter(SignupPageWithGoogle);
