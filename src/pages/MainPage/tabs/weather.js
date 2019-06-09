import React from 'react';

// import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';


const WeatherTab = () => {
  return (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Prognoza pogody</IonTitle>
      </IonToolbar>
    </IonHeader>
    {/* <IonList>
      <ion-list-header>
        <ion-label>Items</ion-label>
      </ion-list-header>
      <IonItem> */}
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            <IonCardTitle>Card Title</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
          </IonCardContent>
        </IonCard>
      {/* </IonItem>
    </IonList> */}

    <IonList>
      <ion-list-header>
        <ion-label>Prognoza dla największych miast w Polsce:</ion-label>
      </ion-list-header>
      <IonItem>
        <IonLabel>Warszawa: </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Kraków: </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Gdańsk</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Poznań</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Wrocław</IonLabel>
      </IonItem>
    </IonList>
  </>
  );
};

export default WeatherTab;
