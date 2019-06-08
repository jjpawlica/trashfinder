/* eslint-disable react/prop-types */
import React from 'react';

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
  IonIcon,
  IonAvatar
} from '@ionic/react';

import { Marker } from 'google-maps-react';

import PlacesMap from '../../../components/Map/list';

const places = [
  {
    id: 1,
    lat: 45.5080397,
    lng: -73.564543
  },
  {
    id: 2,
    lat: -10.7397921,
    lng: -37.809338
  },
  {
    id: 3,
    lat: 41.9238499,
    lng: 20.3755648
  },
  {
    id: 4,
    lat: 41.05,
    lng: -73.54
  },
  {
    id: 5,
    lat: 15.252,
    lng: 120.0169
  }
];

const PlaceItem = ({ place, history }) => {
  const { id, lng, lat } = place;

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
        <IonItem button detail={false} href={`/places/place/${place.id}`} onClick={goToLink}>
          <IonAvatar slot="start">
            <IonIcon name="locate" />
          </IonAvatar>
          {id}
        </IonItem>
      </IonCardHeader>

      <IonCardContent>
        <IonList>
          <IonItem>
            <h3>Long: {lng}</h3>
          </IonItem>
          <IonItem>
            <h3>Lat: {lat}</h3>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

const PlacesTab = ({ history }) => {
  const points = places.map(place => {
    const point = {};
    point.lat = place.lat;
    point.lng = place.lng;
    return point;
  });
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
            <IonCol size="10" style={{ height: '50vh' }}>
              <PlacesMap points={points}>
                {places.map(place => (
                  <Marker key={place.id} position={{ lat: place.lat, lng: place.lng }} />
                ))}
              </PlacesMap>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            {places.map(place => (
              <IonCol size="10" key={place.id}>
                <PlaceItem place={place} history={history} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default PlacesTab;
