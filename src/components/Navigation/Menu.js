import React from 'react';
import { withRouter } from 'react-router-dom';
import { IonMenu, IonItem, IonContent, IonMenuToggle } from '@ionic/react';

const Menu = ({ history }) => (
  <IonMenu contentId="main">
    <IonContent>
      <IonMenuToggle>
        <IonItem onClick={() => history.push('/')}>Home</IonItem>
      </IonMenuToggle>
      <IonMenuToggle>
        <IonItem onClick={() => history.push('/main')}>Main</IonItem>
      </IonMenuToggle>
    </IonContent>
  </IonMenu>
);

export default withRouter(Menu);
