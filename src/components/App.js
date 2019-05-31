/* eslint-disable import/no-extraneous-dependencies */

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { IonApp } from '@ionic/react';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import PasswordForgetPage from '../pages/PasswordForgetPage';

import * as ROUTES from '../constants/routes';

import app from './Firebase';
import 'firebase/auth';
import FirebaseContext from './Firebase/context';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const auth = app.auth();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => setCurrentUser(authUser));
  }, [auth]);

  return (
    <FirebaseContext.Provider value={{ currentUser }}>
      <Router>
        <IonApp>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.LOG_IN} component={LoginPage} />
          <Route path={ROUTES.SIGN_UP_EMAIL} component={SignupPage} />
          <Route path={ROUTES.SIGN_UP_GOOGLE} component={SignupPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        </IonApp>
      </Router>
    </FirebaseContext.Provider>
  );
};

export default App;
