/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IonApp, IonPage, IonContent, IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/react';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import SignUpWithGooglePage from '../pages/SignUpWithGoogle';
// import PasswordForgetPage from '../pages/PasswordForgetPage';
// import MainPage from '../pages/MainPage';
// import ProfilePage from '../pages/ProfilePage';

import FirebaseContext from './Firebase/context';
import UserContext from './User/context';

import * as ROUTES from '../constants/routes';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

import './App.css';

const App = () => {
  const firebase = useContext(FirebaseContext);
  const [user, initialising, error] = useAuthState(firebase.auth);

  const centerSpinner = { marginTop: '47vh', marginLeft: '45vw' };

  if (initialising) {
    return (
      <IonApp>
        <IonPage>
          <IonContent fullscreen>
            <IonGrid fixed>
              <IonRow align-items-end justify-content-center>
                <IonCol align-self-center>
                  <IonSpinner style={centerSpinner} name="crescent" />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      </IonApp>
    );
  }

  return (
    <UserContext.Provider value={{ user, initialising, error }}>
      <Router>
        <div id="app">
          <IonApp>
            <IonPage>
              <Switch>
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route path={ROUTES.LOG_IN} component={LoginPage} />
                <Route path={ROUTES.SIGN_UP_EMAIL} component={SignupPage} />
                <Route path={ROUTES.SIGN_UP_GOOGLE} component={SignUpWithGooglePage} />
                {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
              <Route path={ROUTES.MAIN} component={MainPage} />
              <Route path={ROUTES.PROFILE} component={ProfilePage} /> */}
              </Switch>
            </IonPage>
          </IonApp>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
