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
  IonText,
  IonDatetime
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
  const [usersCount, setUsersCount] = useState(0);

  const [canJoin, setCanJoin] = useState(false);
  const [cleaningDate, setCleaningDate] = useState();

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
        setUsersCount(place.users.length);
        setCreatedAt(place.createdAt.toDate().toISOString());

        console.log(place.cleaningDate);
        if (place.cleaningDate) {
          setCleaningDate(place.cleaningDate.toDate().toISOString());
        }

        const userRef = await firebase.db
          .collection('users')
          .doc(place.user)
          .get();
        setCreatedBy(userRef.id);
        setCreatedByUsername(userRef.data().username);

        setCanJoin(place.users.includes(user.uid));
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
    try {
      await firebase.db
        .collection('places')
        .doc(id)
        .update({ users: firebase.arrayUnion(user.uid) });

      setCanJoin(!canJoin);
      setUsersCount(usersCount + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEventQuit = async event => {
    event.preventDefault();
    try {
      await firebase.db
        .collection('places')
        .doc(id)
        .update({ users: firebase.arrayRemove(user.uid) });

      setCanJoin(!canJoin);
      setUsersCount(usersCount - 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDateChange = async event => {
    const dateToUpdate = event.currentTarget.value;
    try {
      await firebase.db
        .collection('places')
        .doc(id)
        .update({ cleaningDate: firebase.Timestamp.fromDate(new Date(dateToUpdate)) });

      setCleaningDate(dateToUpdate);
    } catch (err) {
      console.log(err);
    }
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
            <IonCol size="11" style={{ height: '50vh' }}>
              <MapContainer lat={lat} lng={lng} center={{ lat, lng }}>
                <Marker position={{ lat, lng }} />
              </MapContainer>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonItem>
                    <IonLabel>{name}</IonLabel>
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
                      <IonLabel>Opis: {description}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Szerokośc: {parseFloat(lat).toFixed(4)}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Wysokosć: {parseFloat(lng).toFixed(4)}</IonLabel>
                    </IonItem>

                    <IonItem>
                      {status ? (
                        <IonLabel style={{ color: 'green' }}>Status: posprzątane</IonLabel>
                      ) : (
                        <IonLabel style={{ color: 'red' }}>Status: nie posprzątane</IonLabel>
                      )}
                      {user.uid === createdBy && (
                        <IonButton fill="clear" slot="end" onClick={handleChanceStatus}>
                          ZMIEŃ
                        </IonButton>
                      )}
                    </IonItem>
                    <IonItem>
                      <IonLabel>Utrzorzone</IonLabel>
                      <IonDatetime
                        displayFormat="MMM DD, YYYY HH:mm"
                        slot="end"
                        value={createdAt}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel>Przez</IonLabel>
                      <IonText slot="end">{createdByUsername}</IonText>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow align-items-center justify-content-center>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonItem>
                    <IonLabel>Zdjęcia</IonLabel>
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
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonItem>
                    <IonGrid>
                      <IonRow>
                        {users.slice(0, 2).map(item => (
                          <IonAvatar
                            style={{ marginLeft: '4px', width: '32px', height: '32px' }}
                            key={item}
                          >
                            <img src={avatar} alt="avatar" />
                          </IonAvatar>
                        ))}
                        {usersCount > 5 && <IonText>...</IonText>}
                      </IonRow>
                    </IonGrid>
                    {canJoin ? (
                      <IonButton fill="clear" slot="end" color="danger" onClick={handleEventQuit}>
                        ZREZYGNUJ
                      </IonButton>
                    ) : (
                      <IonButton fill="clear" slot="end" color="success" onClick={handleEventJoin}>
                        DOŁĄCZ DO SPRZĄTANIA
                      </IonButton>
                    )}
                  </IonItem>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>Chętynch: {usersCount}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>{cleaningDate ? 'W dniu' : 'Dodaj datę'}</IonLabel>
                      <IonDatetime
                        displayFormat="MMM DD, YYYY HH:mm"
                        pickerFormat="MMM DD YYYY HH:mm"
                        slot="end"
                        value={cleaningDate}
                        onIonChange={handleDateChange}
                      />
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
