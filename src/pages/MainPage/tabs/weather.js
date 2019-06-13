/* eslint-disable no-shadow */

import React, { useEffect, useState } from 'react';

import { Plugins } from '@capacitor/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonText,
  IonCardContent,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from '@ionic/react';

const apiID = process.env.REACT_APP_WEATHER_API_ID;

const WeatherTab = () => {
  const { Geolocation } = Plugins;

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [cityName, setCityName] = useState('');
  const [temperature, setTemperature] = useState();
  const [imgURL, setImageURL] = useState('');

  const [forecast, setForecast] = useState();

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState();

  // Get current position
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

  // Check currnet weather
  useEffect(() => {
    const getCurrentWeather = async (lat, lng, apiID) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiID}&units=metric`
        );
        const data = await response.json();
        setCityName(data.name);
        setTemperature(data.main.temp);
        setImageURL(data.weather[0].icon);
      } catch (err) {
        setError(err.message);
      }
    };
    if (lat && lng) {
      getCurrentWeather(lat, lng, apiID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);

  // Check forecast
  useEffect(() => {
    const getForecastWeather = async (lat, lng, apiID) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiID}&units=metric`
        );
        const data = await response.json();
        setForecast(data.list);
      } catch (err) {
        setError(err.message);
      }
    };
    if (lat && lng) {
      getForecastWeather(lat, lng, apiID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Prognoza pogody</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid fixed>
          <IonRow align-items-center justify-content-center>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader color="primary">
                  <IonLabel>Obecna pogoda w {cityName}</IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem lines="none">
                      <IonLabel>
                        <h1>{temperature} ℃</h1>
                      </IonLabel>
                      {imgURL && (
                        <IonImg
                          id="weather-icon"
                          class="weather-icon"
                          src={`http://openweathermap.org/img/w/${imgURL}.png`}
                          slot="end"
                        />
                      )}
                    </IonItem>
                    <IonItem>
                      <IonLabel>
                        <h1>Twoje położenie:</h1>
                      </IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>Szerokość</IonLabel>
                      <IonText slot="end">{parseFloat(lat).toFixed(4)}</IonText>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>Długość</IonLabel>
                      <IonText slot="end">{parseFloat(lng).toFixed(4)}</IonText>
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
                  <IonLabel>Progoda w {cityName} w najbliższym czasie</IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {forecast &&
                      forecast.map(item => (
                        <IonItem key={item.dt}>
                          <IonText>{item.main.temp}℃</IonText>
                          <IonImg
                            id="weather-icon"
                            class="weather-icon"
                            src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                            slot="end"
                          />
                        </IonItem>
                      ))}
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

export default WeatherTab;
