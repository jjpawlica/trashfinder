/* eslint-disable no-unused-vars */
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

  const [error, setError] = useState('');

  const [comment, setComment] = useState('');

  const [comments, loadingComments, errorComments] = useCollection(
    firebase.db.collection('comments').where('place', '==', id),
    {
      includeMetadataChanges: true
    }
  );

  const [place, loadingPlace, errorPlace] = useCollection(
    firebase.db.collection('places').doc(id),
    {
      includeMetadataChanges: true
    }
  );

  const [profile, loadingProfile, errorProfile] = useCollection(
    firebase.db.collection('users').doc(user.uid),
    {
      includeMetadataChanges: true
    }
  );

  const handleChangeStatus = async event => {
    event.preventDefault();
    try {
      await firebase.db
        .collection('places')
        .doc(id)
        .update({ status: !place.data().status });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEventJoin = async event => {
    event.preventDefault();
    try {
      await firebase.db
        .collection('places')
        .doc(id)
        .update({ users: firebase.arrayUnion(user.uid) });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEventQuit = async event => {
    event.preventDefault();
    try {
      await firebase.db
        .collection('places')
        .doc(id)
        .update({ users: firebase.arrayRemove(user.uid) });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDateChange = async event => {
    const dateToUpdate = event.currentTarget.value;
    try {
      await firebase.db
        .collection('places')
        .doc(id)
        .update({ cleaningDate: firebase.Timestamp.fromDate(new Date(dateToUpdate)) });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddComment = async event => {
    event.preventDefault();
    try {
      await firebase.db.collection('comments').add({
        body: comment,
        place: id,
        createdAt: firebase.timestamp,
        createdBy: profile.data().username
      });
      setComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{place ? `Miejsce: ${place.data().name}` : `Miejsce`}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {place && (
        <IonContent fullscreen>
          <IonGrid fixed>
            <IonRow align-items-center justify-content-center>
              <IonCol size="11" style={{ height: '50vh' }}>
                <MapContainer
                  lat={place.data().location.latitude}
                  lng={place.data().location.longitude}
                  center={{
                    lat: place.data().location.latitude,
                    lng: place.data().location.longitude
                  }}
                >
                  <Marker
                    position={{
                      lat: place.data().location.latitude,
                      lng: place.data().location.longitude
                    }}
                  />
                </MapContainer>
              </IonCol>
            </IonRow>
            <IonRow align-items-center justify-content-center>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader color="primary">
                    <IonLabel>Nazwa: {place.data().name}</IonLabel>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList>
                      <IonItem>
                        <IonLabel>Opis: {place.data().description}</IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonLabel>
                          Szerokośc: {parseFloat(place.data().location.latitude).toFixed(4)}
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonLabel>
                          Wysokosć: {parseFloat(place.data().location.longitude).toFixed(4)}
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        {place.data().status ? (
                          <IonLabel color="success">posprzątane</IonLabel>
                        ) : (
                          <IonLabel color="danger"> nie posprzątane</IonLabel>
                        )}
                        {user.uid === place.data().user && (
                          <IonButton fill="clear" slot="end" onClick={handleChangeStatus}>
                            ZMIEŃ
                          </IonButton>
                        )}
                      </IonItem>
                      <IonItem>
                        <IonLabel>Stworzono</IonLabel>
                        <IonDatetime
                          displayFormat="MMM DD, YYYY"
                          slot="end"
                          value={place
                            .data()
                            .createdAt.toDate()
                            .toISOString()}
                          readonly
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
                  <IonCardHeader color="primary">
                    <IonItem lines="none" color="primary">
                      <IonLabel>Sprzątanie</IonLabel>
                      {place.data().users.includes(user.uid) ? (
                        <IonButton slot="end" color="danger" onClick={handleEventQuit}>
                          ZREZYGNUJ
                        </IonButton>
                      ) : (
                        <IonButton slot="end" color="success" onClick={handleEventJoin}>
                          DOŁĄCZ
                        </IonButton>
                      )}
                    </IonItem>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList>
                      <IonItem>
                        <IonLabel>Chętynch: </IonLabel>
                        <IonText slot="end">{place.data().users.length}</IonText>
                      </IonItem>
                      <IonItem>
                        <IonLabel>{place.data().cleaningDate ? 'W dniu' : 'Dodaj datę'}</IonLabel>
                        <IonDatetime
                          displayFormat="MMM DD, YYYY HH:mm"
                          pickerFormat="MMM DD YYYY HH:mm"
                          slot="end"
                          value={
                            place.data().cleaningDate
                              ? place
                                  .data()
                                  .cleaningDate.toDate()
                                  .toISOString()
                              : ''
                          }
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
                  <IonCardHeader color="primary">
                    <IonLabel>Komentarze ({comments && comments.docs.length})</IonLabel>
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
                            <IonText>{doc.data().body}</IonText>
                            <IonText slot="end">{doc.data().createdBy}</IonText>
                          </IonItem>
                        ))}
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      )}
    </>
  );
};

export default PlaceTab;
