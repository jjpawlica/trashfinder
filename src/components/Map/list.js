/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const PlacesMap = ({ google, points, ...other }) => {
  const [bounds, setBounds] = useState(null);

  // Updates bounds after load
  useEffect(() => {
    const newBounds = new google.maps.LatLngBounds();
    points.forEach(point => {
      newBounds.extend(point);
    });

    setBounds(newBounds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  return (
    <Map
      google={google}
      initialCenter={{
        lat: 50.0647,
        lng: 19.945
      }}
      bounds={bounds}
      {...other}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(PlacesMap);
