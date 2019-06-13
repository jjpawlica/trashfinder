/* eslint-disable react/prop-types */

import React from 'react';
import { withRouter } from 'react-router-dom';

import { IonCol, IonRow } from '@ionic/react';

import * as ROUTES from '../../constants/routes';

import logo from '../../images/logo.svg';

const Header = ({ history }) => {
  return (
    <IonRow justify-content-center>
      <IonCol size="12" onClick={() => history.push(ROUTES.LANDING)}>
        <img src={logo} alt="Logo" className="app-logo" />
      </IonCol>
    </IonRow>
  );
};

export default withRouter(Header);
