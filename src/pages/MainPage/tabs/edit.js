import React, { useContext, useEffect, useState } from 'react';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonAvatar,
  IonItem,
  IonLabel,
  IonInput,
  IonText
} from '@ionic/react';

import FirebaseContext from '../../../components/Firebase/context';
import UserContext from '../../../components/User/context';

import avatar from '../../../images/avatar.svg';

const ProfileEditTab = () => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [invalid, setInvalid] = useState(true);
  const [error, setError] = useState('');

  // Check if current user has username
  useEffect(() => {
    const fetchUsername = async () => {
      const response = await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get();

      const data = response.data();
      if (data.username) {
        setUsername(data.username);
      }
    };
    fetchUsername();
  }, [firebase, firebase.db, user.uid]);

  const handleProfileChange = async event => {
    event.preventDefault();
  };

  const removeDisplayName = async event => {
    event.preventDefault();
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Edytuj Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scroll-y={false}>
        <IonGrid fixed>
          <IonRow
            style={{ marginTop: '8px', marginBottom: '24px' }}
            align-items-center
            justify-content-center
          >
            <IonCol size="3">
              <IonAvatar style={{ width: '64px', height: '64px' }}>
                <img src={user.photoURL || avatar} alt="avatar" />
              </IonAvatar>
            </IonCol>
            <IonCol size="7">
              <IonText color="primary">
                <p>{username ? `@${username}` : '________________'}</p>
              </IonText>
              <p className="text-small">{user.email}</p>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol size="10">
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Nazwa użytkownia
                </IonLabel>
                <IonInput
                  autofocus
                  required
                  placeholder="Nazwa użytkownika"
                  name="username"
                  value={username}
                  onIonChange={e => setUsername(e.currentTarget.value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow style={{ marginTop: '128px' }} justify-content-center>
            <IonCol size="10">
              <IonButton expand="block" onClick={handleProfileChange} disabled={invalid}>
                Zapisz zmiany
              </IonButton>
              <IonButton expand="block" onClick={removeDisplayName}>
                REMOVE
              </IonButton>
              <IonButton expand="block" fill="clear" href="/profile">
                Odrzuć zmiany
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ProfileEditTab;
