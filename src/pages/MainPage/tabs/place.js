/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonLabel,
  IonAvatar,
  IonThumbnail,
  IonTextarea,
  IonText
} from '@ionic/react';

import { Marker } from 'google-maps-react';

import FirebaseContext from '../../../components/Firebase/context';
import UserContext from '../../../components/User/context';

import MapContainer from '../../../components/Map/add';

import avatar from '../../../images/avatar.svg';

const PlaceTab = ({ match, history }) => {
  const { id } = match.params;

  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [name, setName] = useState('');
  const [description, setDescritpion] = useState('');
  const [status, setStatus] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [createdByUsername, setCreatedByUsername] = useState('');
  const [users, setUsers] = useState([]);

  const [canJoin, setCanJoin] = useState(true);

  const [comment, setComment] = useState('');

  // Check if place exists
  useEffect(() => {
    const fetchPlace = async () => {
      const placeRef = await firebase.db
        .collection('places')
        .doc(id)
        .get();

      if (placeRef.exists) {
        const place = placeRef.data();
        setLat(place.location.latitude);
        setLng(place.location.longitude);
        setName(place.name);
        setDescritpion(place.description);
        setStatus(place.status);
        setUsers(place.users);
        setCreatedAt(place.createdAt.toDate().toLocaleDateString('pl-PL'));

        const userRef = await firebase.db
          .collection('users')
          .doc(place.user)
          .get();
        setCreatedBy(userRef.id);
        setCreatedByUsername(userRef.data().username);
      } else {
        history.push('/places');
      }
    };
    fetchPlace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChanceStatus = async event => {
    event.preventDefault();
    try {
      await firebase.db
        .collection('places')
        .doc(id)
        .update({ status: !status });

      setStatus(!status);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEventJoin = async event => {
    event.preventDefault();
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid fixed>
          <IonRow align-items-center justify-content-center>
            <IonCol size="10" style={{ height: '50vh' }}>
              <MapContainer lat={lat} lng={lng} center={{ lat, lng }}>
                <Marker position={{ lat, lng }} />
              </MapContainer>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol size="10">
              <IonCard>
                <IonCardHeader>
                  <IonItem>
                    <IonLabel>
                      <h1>{name}</h1>
                    </IonLabel>
                    {user.uid === createdBy && (
                      <IonButton fill="clear" slot="end">
                        EDYTUJ
                      </IonButton>
                    )}
                  </IonItem>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <p>
                        Szerokośc: {parseFloat(lat).toFixed(4)} Wysokosć:{' '}
                        {parseFloat(lng).toFixed(4)}
                      </p>
                    </IonItem>
                    <IonItem>
                      <p>Opis: {description}</p>
                    </IonItem>
                    <IonItem>
                      {status ? (
                        <p style={{ color: 'green' }}>Status: posprzątane</p>
                      ) : (
                        <p style={{ color: 'red' }}>Status: nie posprzątane</p>
                      )}
                      {user.uid === createdBy && (
                        <IonButton fill="clear" slot="end" onClick={handleChanceStatus}>
                          ZMIEŃ
                        </IonButton>
                      )}
                    </IonItem>
                    <IonItem color="primary">
                      <p>
                        Utrzorzone w dniu {createdAt} przez {createdByUsername}
                      </p>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow align-items-center justify-content-center>
            <IonCol size="10">
              <IonCard>
                <IonCardHeader>
                  <IonItem>
                    <IonLabel>
                      <h1>Zdjęcia</h1>
                    </IonLabel>
                    <IonButton fill="clear" slot="end">
                      Dodaj zdjęcie
                    </IonButton>
                  </IonItem>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="4">
                        <IonThumbnail>
                          <img
                            src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                            alt="pic"
                          />
                        </IonThumbnail>
                      </IonCol>
                      <IonCol size="4">
                        <IonThumbnail>
                          <img
                            src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                            alt="pic"
                          />
                        </IonThumbnail>
                      </IonCol>
                      <IonCol size="4">
                        <IonThumbnail>
                          <img
                            src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                            alt="pic"
                          />
                        </IonThumbnail>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow align-items-center justify-content-center>
            <IonCol size="10">
              <IonCard>
                <IonCardHeader>
                  <IonItem>
                    <IonGrid>
                      <IonRow>
                        {users.slice(0, 5).map(() => (
                          <IonAvatar style={{ marginLeft: '4px', width: '32px', height: '32px' }}>
                            <img src={avatar} alt="avatar" />
                          </IonAvatar>
                        ))}
                        {users.length > 5 && <IonText>...</IonText>}
                      </IonRow>
                    </IonGrid>
                    <IonButton fill="clear" slot="end">
                      DOŁĄCZ DO SPRZĄTANIA
                    </IonButton>
                  </IonItem>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <p>Chętynch: {users.length}</p>
                    </IonItem>
                    <IonItem>
                      <p>W dniu: 15.06.2019</p>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow align-items-center justify-content-center>
            <IonCol size="10">
              <IonCard>
                <IonCardHeader>
                  <IonItem>
                    <IonLabel>
                      <h1>Komentarze (15)</h1>
                    </IonLabel>
                  </IonItem>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonTextarea
                        required
                        placeholder="Dodaj komentarz"
                        name="comment"
                        maxlength="200"
                        value={comment}
                        onIonChange={e => console.log(e.currentTarget.value)}
                      />
                    </IonItem>
                    <IonButton style={{ marginTop: '32px' }} expand="block">
                      Dodaj komentarz
                    </IonButton>
                    <IonItem>
                      <p>Komentarz 1</p>
                    </IonItem>
                    <IonItem>
                      <p>Komentarz 2</p>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default PlaceTab;
