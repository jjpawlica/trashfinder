/* eslint-disable react/prop-types */

import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = ({ google, zoom, lat, lng, ...other }) => {
  return <Map google={google} zoom={zoom} initialCenter={{ lat, lng }} {...other} />;
};

MapContainer.defaultProps = {
  zoom: 18,
  lat: 50.06821902409837,
  lng: 19.955816843574212
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);
