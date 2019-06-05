import React from 'react';

import { IonPage, IonList, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions } from '@ionic/react';


import TabBar from '../../components/Navigation/TabBar';

const MainPage = () => {
  return (
    <IonPage>
      
      <IonList>
        <IonItem>
          <IonLabel>Pokémon Yellow</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Mega Man X</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>The Legend of Zelda</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Pac-Man</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Super Mario World</IonLabel>
        </IonItem>
      </IonList>

      <TabBar />
    </IonPage>
  );
};

export default MainPage;
