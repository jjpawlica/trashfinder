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
  IonLabel,
  IonGrid, IonRow, IonCol ,
  IonImg
} from '@ionic/react';



// test(() => {
//   console.log('testt');
// }, []);

const WeatherTab = () => {

  const latitude = 50.0646501;
  const longitude = 19.9449799



  const getCurrentWeather = (lat, lon) => {
    const apiId = process.env.REACT_APP_WEATHER_API_ID;

    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+apiId+'&units=metric';
    
    console.log(apiUrl);
    fetch(apiUrl)
    .then(response => {
      return response.json()
    })
    .then(data => {
      // console.log(data);

      document.getElementById('cityName').innerText = data.name;

      document.getElementById('lat').innerText = data.coord.lat;
      document.getElementById('lon').innerText = data.coord.lon;

      // let temperatureCelsius = ((data.main.temp - 32) / 180).toPrecision(3);
      document.getElementById('temperature').innerText = data.main.temp+' ℃';

      let iconUrl = 'http://openweathermap.org/img/w/'+data.weather[0].icon+'.png';
      document.getElementById('weather-icon').src = iconUrl;
    })
    .catch(err => {
      console.log(err)
    });
  }


  const getForecastWeather = (lat, lon) => {
    const apiId = process.env.REACT_APP_WEATHER_API_ID;

    let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+apiId+'&units=metric';
    
    console.log(apiUrl);
    fetch(apiUrl)
    .then(response => {
      return response.json()
    })
    .then(data => {
      // console.log(data);
      let list = document.getElementById('forecastList');
      data.list.forEach(function(item){
        let el = document.createElement('IonItem');
        el.innerHTML = '<IonLabel>Test</IonLabel>';

        list.appendChild(el);
      });

    })
    .catch(err => {
      console.log(err)
    });
  }




  getCurrentWeather(latitude, longitude);

  getForecastWeather(latitude, longitude);



  return (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Prognoza pogody</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonCard>
      <IonCardHeader>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonCardSubtitle>Prognoza pogody dla: <strong id="cityName"></strong></IonCardSubtitle>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCardSubtitle><IonCardTitle id="temperature"></IonCardTitle></IonCardSubtitle>
          </IonCol>
          <IonCol>
            <IonCardSubtitle><IonImg id="weather-icon" class="weather-icon" src="http://openweathermap.org/img/w/01d.png"></IonImg></IonCardSubtitle>
          </IonCol>
        </IonRow>
      </IonGrid>
      </IonCardHeader>

      <IonCardContent>
        Twoje położenie:<br />
        Szerokość geograficzna: <strong id="lat"></strong>,
        <br />
        Długość geograficzna: <strong id="lon"></strong>
      </IonCardContent>
    </IonCard>

    <IonList id="forecastList">
      <ion-list-header>
        <ion-label>Progoda w Krakowie w najbliższym czasie...:</ion-label>
      </ion-list-header>
      {/* <IonItem>
        <IonLabel>12 stopni: </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>10 stopni: </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Gdańsk</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Poznań</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Wrocław</IonLabel>
      </IonItem>*/}
    </IonList> 
  </>
  );
};

export default WeatherTab;
