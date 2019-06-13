/* eslint-disable react/prop-types */

import React, { useContext } from 'react';

import { useCollection } from 'react-firebase-hooks/firestore';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonAvatar
} from '@ionic/react';

import numeral from 'numeral';

import FirebaseContext from '../../../components/Firebase/context';
import UserContext from '../../../components/User/context';

import avatar from '../../../images/avatar.svg';

const ProfileTab = ({ history }) => {
  const firebase = useContext(FirebaseContext);

  const { user } = useContext(UserContext);
  const { uid, email, photoURL } = user;

  // eslint-disable-next-line no-unused-vars
  const [profile, loading, error] = useCollection(firebase.db.collection('users').doc(uid), {
    includeMetadataChanges: true
  });

  const handleSingout = async event => {
    event.preventDefault();
    await firebase.auth.signOut();
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Profil Użytkownika</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scroll-y={false}>
        <IonGrid fixed>
          <IonRow justify-content-center>
            <IonCol size="12">
              <IonAvatar style={{ margin: '10vh auto 32px', width: '120px', height: '120px' }}>
                <img src={photoURL || avatar} alt="avatar" />
              </IonAvatar>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol size="3">
              <p className="text-center">{profile ? profile.data().places : `--`}</p>
              <p className="text-center text-small">Miejsca</p>
            </IonCol>
            <IonCol size="3">
              <p className="text-center">{profile ? profile.data().points : `--`}</p>
              <p className="text-center text-small">Punkty</p>
            </IonCol>
            <IonCol size="3">
              <p className="text-center">
                {profile ? numeral(profile.data().fallowers).format('0.0a') : `--`}
              </p>
              <p className="text-center text-small">Obserwujący</p>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol size="12">
              {profile && <h1 className="text-center">{profile.data().username}</h1>}
              <h4 className="text-center text-bottom-margin">{email}</h4>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol size="10">
              <IonButton expand="block" onClick={() => history.push('/profile/edit')}>
                Edytuj profil
              </IonButton>
              <IonButton expand="block" fill="clear" onClick={handleSingout}>
                Wyloguj się
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ProfileTab;
