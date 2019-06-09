/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';

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
  IonLabel,
  IonText
} from '@ionic/react';

import { Marker } from 'google-maps-react';

import PlacesMap from '../../../components/Map/list';

import FirebaseContext from '../../../components/Firebase/context';
import UserContext from '../../../components/User/context';

const PlaceItem = ({ place, id, history }) => {
  const goToLink = async event => {
    if (!event.currentTarget) {
      return;
    }
    event.preventDefault();
    history.push(event.currentTarget.href);
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonItem button detail={false} href={`/places/place/${id}`} onClick={goToLink}>
          <h1>{place.name}</h1>
        </IonItem>
      </IonCardHeader>

      <IonCardContent>
        <IonList>
          <IonItem>
            <IonLabel>Opis: {place.description}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Szerokośc: {parseFloat(place.location.latitude).toFixed(4)}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Wysokosć: {parseFloat(place.location.longitude).toFixed(4)}</IonLabel>
          </IonItem>

          <IonItem>
            {place.status ? (
              <IonLabel style={{ color: 'green' }}>posprzątane</IonLabel>
            ) : (
              <IonLabel style={{ color: 'red' }}> nie posprzątane</IonLabel>
            )}
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

const PlacesTab = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const [places, loading, error] = useCollection(
    firebase.db
      .collection('places')
      .orderBy('createdAt', 'desc')
      .limit(5),
    {
      includeMetadataChanges: true
    }
  );

  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (places) {
      const newPoints = places.docs.map(doc => {
        const point = {};
        point.lat = doc.data().location.latitude;
        point.lng = doc.data().location.longitude;
        return point;
      });

      setPoints(newPoints);
    }
  }, [places]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Places</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid fixed>
          <IonRow align-items-center justify-content-center>
            <IonCol size="11" style={{ height: '50vh' }}>
              {places ? (
                <PlacesMap points={points}>
                  {places.docs.map(doc => (
                    <Marker
                      key={doc.id}
                      position={{
                        lat: doc.data().location.latitude,
                        lng: doc.data().location.longitude
                      }}
                    />
                  ))}
                </PlacesMap>
              ) : (
                <IonText>Brak miejsc do wyświetlenia</IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            {places &&
              places.docs.map(doc => (
                <IonCol size="12" key={doc.id}>
                  <PlaceItem id={doc.id} place={doc.data()} history={history} />
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default PlacesTab;
