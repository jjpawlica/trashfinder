import React, { useEffect, useState, useContext } from 'react';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton
} from '@ionic/react';

import { Marker } from 'google-maps-react';

import { Plugins } from '@capacitor/core';

import MapContainer from '../../../components/Map/add';

import FirebaseContext from '../../../components/Firebase/context';
import UserContext from '../../../components/User/context';

const AddPlaceTab = ({ history }) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [name, setName] = useState('');
  const [description, setDescritpion] = useState('');
  const [invalid, setInvalid] = useState(true);
  const [error, setError] = useState('');

  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const { Geolocation } = Plugins;

  // Check if current user has username
  useEffect(() => {
    const getCurrentPosition = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        setLat(coordinates.coords.latitude);
        setLng(coordinates.coords.longitude);
      } catch (err) {
        setError(err.message);
      }
    };
    getCurrentPosition();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if form is valid
  useEffect(() => {
    if (
      lat !== '' &&
      lng !== '' &&
      name !== '' &&
      description !== '' &&
      description.length <= 200
    ) {
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  }, [lat, lng, name, description]);

  const handleMapClick = (ref, map, event) => {
    const location = event.latLng;
    map.panTo(location);
    setLat(location.lat());
    setLng(location.lng());
  };

  const addPlace = async event => {
    event.preventDefault();

    try {
      const ref = await firebase.db.collection('places').add({
        name,
        description,
        location: new firebase.GeoPoint(lat, lng),
        user: user.uid,
        status: false,
        createAt: firebase.timestamp,
        users: [user.uid]
      });

      history.push(`/places/place/${ref.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Place</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid fixed>
          <IonRow align-items-center justify-content-center>
            <IonCol size="10" style={{ height: '50vh' }}>
              <MapContainer onClick={handleMapClick} lat={lat} lng={lng}>
                <Marker position={{ lat, lng }} />
              </MapContainer>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol size="10">
              <IonCard>
                <IonCardHeader>
                  {error && (
                    <IonItem color="dange">
                      <p>{error}</p>
                    </IonItem>
                  )}
                  <IonItem>
                    <h3>Lat: {lat} </h3>
                  </IonItem>
                  <IonItem>
                    <h3>Lng: {lng}</h3>
                  </IonItem>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating" color="primary">
                      Nazwa miejsca / Adres
                    </IonLabel>
                    <IonInput
                      autofocus
                      required
                      placeholder="Nazwa miejsca / adres"
                      name="place-name"
                      value={name}
                      onIonChange={e => setName(e.currentTarget.value)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating" color="primary">
                      Opis miejsca ({description.length} / 200 )
                    </IonLabel>
                    <IonTextarea
                      required
                      placeholder="Opis miejsca"
                      name="place-description"
                      maxlength="200"
                      value={description}
                      onIonChange={e => setDescritpion(e.currentTarget.value)}
                    />
                  </IonItem>
                  <IonButton
                    style={{ marginTop: '32px' }}
                    expand="block"
                    onClick={addPlace}
                    disabled={invalid}
                  >
                    Dodaj miejsce
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default AddPlaceTab;
