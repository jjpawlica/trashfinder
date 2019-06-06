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

const places = [
  {
    id: 1,
    long: -73.564543,
    lat: 45.5080397
  },
  {
    id: 2,
    long: -37.809338,
    lat: -10.7397921
  },
  {
    id: 3,
    long: 20.3755648,
    lat: 41.9238499
  },
  {
    id: 4,
    long: -73.54,
    lat: 41.05
  },
  {
    id: 5,
    long: '120.0169',
    lat: '15.252'
  }
];

const PlaceItem = ({ place, history }) => {
  const { id, long, lat } = place;

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
            <h3>Long: {long}</h3>
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
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Places</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonGrid fixed>
            <IonRow align-items-stretch>
              {places.map(place => (
                <IonCol size="12" key={place.id}>
                  <PlaceItem place={place} history={history} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </>
  );
};

export default PlacesTab;
