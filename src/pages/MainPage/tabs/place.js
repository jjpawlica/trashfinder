/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';

import { useCollection } from 'react-firebase-hooks/firestore';

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
  IonThumbnail,
  IonTextarea,
  IonText,
  IonDatetime
} from '@ionic/react';

import { Marker } from 'google-maps-react';

import FirebaseContext from '../../../components/Firebase/context';
import UserContext from '../../../components/User/context';

import MapContainer from '../../../components/Map/add';

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

  const [comments, loading, error] = useCollection(
    firebase.db.collection('comments').where('place', '==', id),
    {
      includeMetadataChanges: true
    }
  );

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

  const handleAddComment = async event => {
    event.preventDefault();
    try {
      await firebase.db.collection('comments').add({
        body: comment,
        place: id,
        createdAt: firebase.timestamp,
        createdBy: user.uid
      });
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Miejsce: {name}</IonTitle>
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
                <IonCardHeader color="primary">
                  <IonLabel>Nazwa: {name}</IonLabel>
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
                        <IonLabel color="success">posprzątane</IonLabel>
                      ) : (
                        <IonLabel color="danger"> nie posprzątane</IonLabel>
                      )}
                      {user.uid === createdBy && (
                        <IonButton fill="clear" slot="end" onClick={handleChanceStatus}>
                          ZMIEŃ
                        </IonButton>
                      )}
                    </IonItem>
                    <IonItem>
                      <IonLabel>Stworzono</IonLabel>
                      <IonDatetime
                        displayFormat="MMM DD, YYYY"
                        slot="end"
                        value={createdAt}
                        readonly
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
                    <IonButton fill="clear" slot="end" onClick={() => console.log('ADD PHOTO')}>
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
                            alt="thumb"
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
                    <IonLabel>Sprzątanie</IonLabel>
                    {canJoin ? (
                      <IonButton fill="clear" slot="end" color="danger" onClick={handleEventQuit}>
                        ZREZYGNUJ
                      </IonButton>
                    ) : (
                      <IonButton fill="clear" slot="end" color="success" onClick={handleEventJoin}>
                        DOŁĄCZ
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
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonItem>
                    <IonLabel>
                      <h1>Komentarze ({comments && comments.docs.length})</h1>
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
                        onIonChange={e => setComment(e.currentTarget.value)}
                      />
                    </IonItem>
                    <IonButton
                      style={{ marginTop: '32px' }}
                      expand="block"
                      onClick={handleAddComment}
                    >
                      Dodaj komentarz
                    </IonButton>
                    {comments &&
                      comments.docs.map(doc => (
                        <IonItem key={doc.id} lines="none">
                          <p>{doc.data().body}</p>
                        </IonItem>
                      ))}
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
