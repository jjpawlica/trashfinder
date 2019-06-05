/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route, Redirect, withRouter } from 'react-router';

import { IonPage } from '@ionic/react';

const MainPage = () => {
  return (
    <IonPage>
      <Route exact path="/main" render={() => <Redirect to="/profile" />} />
    </IonPage>
  );
};

export default withRouter(MainPage);
