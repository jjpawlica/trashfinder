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

const ProfileEditTab = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [invalid, setInvalid] = useState(true);
  const [error, setError] = useState('');

  // Check if current user has username
  useEffect(() => {
    const fetchUsername = async () => {
      const response = await firebase.db
        .collection('users')
        .doc(user.uid)
        .get();

      const data = response.data();
      if (data.username) {
        setUsername(data.username);
        setCurrentUsername(data.username);
      }
    };
    fetchUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if username is available and not black
  useEffect(() => {
    const checkUsername = async () => {
      const response = await firebase.db
        .collection('usernames')
        .doc(username.toLowerCase())
        .get();

      const isTaken = response.exists;

      if (username === currentUsername || isTaken) {
        setInvalid(true);
        setError(' jest już zajęte!');
      } else {
        setInvalid(false);
        setError(' jest dostępne!');
      }
    };

    if (username === '') {
      setInvalid(true);
      setError(' Nazwa użytownika nie może być pusta');
    }

    if (username !== '') {
      checkUsername();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleProfileChange = async event => {
    event.preventDefault();
    if (!invalid) {
      try {
        await firebase.db
          .collection('users')
          .doc(user.uid)
          .update({ username });

        await firebase.db
          .collection('usernames')
          .doc(username)
          .set({ user: user.uid });

        await firebase.db
          .collection('usernames')
          .doc(currentUsername)
          .delete();
      } catch (err) {
        console.log(err);
      }
      history.push('/profile');
    }
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
                <p>{currentUsername ? `@${currentUsername}` : '________________'}</p>
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
            <IonCol size="10">
              <IonText color={invalid ? 'danger' : 'success'}>
                {username === '' && <p style={{ margin: 0, paddingLeft: '15px' }}>{error}</p>}
                {username && username !== currentUsername && (
                  <p style={{ margin: 0, paddingLeft: '15px' }}>
                    {username}
                    {error}
                  </p>
                )}
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow style={{ marginTop: '128px' }} justify-content-center>
            <IonCol size="10">
              <IonButton expand="block" onClick={handleProfileChange} disabled={invalid}>
                Zapisz zmiany
              </IonButton>

              <IonButton expand="block" fill="clear" onClick={() => history.push('/profile')}>
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
