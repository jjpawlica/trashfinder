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

import MapContainer from '../../../components/Map/add';

const AddPlaceTab = () => {
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
              <MapContainer />
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol size="10">
              <IonCard>
                <IonCardHeader>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonIcon name="locate" />
                    </IonAvatar>
                    Kraków
                  </IonItem>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <h3>Lat: 50.0647 </h3>
                    </IonItem>
                    <IonItem>
                      <h3>Lng: 19.945</h3>
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

export default AddPlaceTab;
