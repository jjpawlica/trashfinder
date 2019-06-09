import React, { useContext, useState, useEffect } from 'react';

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

import FirebaseContext from '../../../components/Firebase/context';
import UserContext from '../../../components/User/context';

import avatar from '../../../images/avatar.svg';

const ProfileTab = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const { email, photoURL } = user;

  const [currentUsername, setCurrentUsername] = useState('');

  // Check if current user has username
  useEffect(() => {
    const fetchUsername = async () => {
      const response = await firebase.db
        .collection('users')
        .doc(user.uid)
        .get();

      const data = response.data();
      if (data.username) {
        setCurrentUsername(data.username);
      }
    };
    fetchUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <p className="text-center">80</p>
              <p className="text-center text-small">Miejsca</p>
            </IonCol>
            <IonCol size="3">
              <p className="text-center">180</p>
              <p className="text-center text-small">Punkty</p>
            </IonCol>
            <IonCol size="3">
              <p className="text-center">3.4k</p>
              <p className="text-center text-small">Obserwujący</p>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol size="12">
              {currentUsername && <h1 className="text-center">{currentUsername}</h1>}
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
