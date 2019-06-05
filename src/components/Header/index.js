import React from 'react';
import { Link } from 'react-router-dom';

import { IonCol, IonRow } from '@ionic/react';

import * as ROUTES from '../../constants/routes';

import logo from '../../images/logo.svg';

const Header = () => {
  return (
    <IonRow justify-content-center>
      <IonCol size="12">
        <Link to={ROUTES.LANDING}>
          <img src={logo} alt="Logo" className="app-logo" />
        </Link>
      </IonCol>
    </IonRow>
  );
};

export default Header;
