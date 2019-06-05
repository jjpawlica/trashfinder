import React from 'react';
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

import '../index.css';

const SignupPage = ({ history }) => {
  return (
    <IonContent fullscreen scroll-y="false">
      <IonGrid fixed className="content-wrapper">
        <Header />
        <IonRow>
          <IonCol className="center-column" size="12">
            <h1 className="main-text">Sing Up</h1>
          </IonCol>
          <IonCol className="center-column" size="12">
            <IonItem className="input-size">
              <IonLabel position="floating" color="primary">
                Username
              </IonLabel>
              <IonInput
                autofocus
                required
                pattern="text"
                placeholder="Enter Username"
                type="text"
              />
            </IonItem>
          </IonCol>
          <IonCol className="center-column" size="12">
            <IonItem className="input-size">
              <IonLabel position="floating" color="primary">
                Email
              </IonLabel>
              <IonInput required pattern="email" placeholder="Enter Email" type="email" />
            </IonItem>
          </IonCol>
          <IonCol className="center-column" size="12">
            <IonItem className="input-size">
              <IonLabel position="floating" color="primary">
                Password
              </IonLabel>
              <IonInput required pattern="password" placeholder="Eneter Password" type="password" />
            </IonItem>
          </IonCol>
          <IonCol className="center-column" size="12">
            <IonItem className="input-size">
              <IonLabel position="floating" color="primary">
                Confirm Password
              </IonLabel>
              <IonInput
                required
                pattern="password"
                placeholder="Confirm Password "
                type="password"
              />
            </IonItem>
          </IonCol>
          <IonCol className="center-column" size="12">
            <IonButton expand="block" color="primary" className="input-size">
              SIGN UP
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="center-text" size="12">
            <IonText>Do you already have account? </IonText>
            <Link to={ROUTES.LOG_IN}>
              <IonText color="primary">Log in</IonText>
            </Link>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default withRouter(SignupPage);
