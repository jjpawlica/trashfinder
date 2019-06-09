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
  IonLabel
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
  const [createdAt, setCreatedAt] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [createdByUsername, setCreatedByUsername] = useState('');

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
        setCreatedAt(place.createAt.toDate().toLocaleDateString('pl-PL'));

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
                        EDIT
                      </IonButton>
                    )}
                  </IonItem>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <p>
                        Lat: {lat} Lat: {lng}
                      </p>
                    </IonItem>
                    <IonItem>
                      <p>{description}</p>
                    </IonItem>
                    <IonItem color="primary">
                      <p>
                        Created at {createdAt} by {createdByUsername}
                      </p>
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
