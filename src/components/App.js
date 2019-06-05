/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IonApp, IonPage } from '@ionic/react';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import SignUpWithGooglePage from '../pages/SignUpWithGoogle';
import PasswordForgetPage from '../pages/PasswordForgetPage';
import MainPage from '../pages/MainPage';
import ProfilePage from '../pages/ProfilePage';

import * as ROUTES from '../constants/routes';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

const App = () => {
  return (
    <Router>
      <div id="app">
        <IonApp>
          <IonPage>
            <Switch>
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <Route path={ROUTES.LOG_IN} component={LoginPage} />
              <Route path={ROUTES.SIGN_UP_EMAIL} component={SignupPage} />
              <Route path={ROUTES.SIGN_UP_GOOGLE} component={SignUpWithGooglePage} />
              <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
              <Route path={ROUTES.MAIN} component={MainPage} />
              <Route path={ROUTES.PROFILE} component={ProfilePage} />
            </Switch>
          </IonPage>
        </IonApp>
      </div>
    </Router>
  );
};

export default App;
