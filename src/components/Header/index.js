import React from 'react';
import { Link } from 'react-router-dom';

import { IonIcon, IonCol, IonText, IonRow } from '@ionic/react';

import * as ROUTES from '../../constants/routes';

import './index.css';

const Header = () => {
  return (
    <IonRow>
      <IonCol className="center-column" size="12">
        <IonIcon name="leaf" color="success" className="mini-logo" />
        <Link to={ROUTES.LANDING}>
          <IonText color="success">
            <h1>Trashfinder</h1>
          </IonText>
        </Link>
      </IonCol>
    </IonRow>
  );
};

export default Header;
