import React from 'react';
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps';

function Map() {
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{lat: -34.778340, lng: -58.448000}}
        />
    );
}

const VehicleSearchMap = withScriptjs(
    withGoogleMap(Map)
);

export default VehicleSearchMap;