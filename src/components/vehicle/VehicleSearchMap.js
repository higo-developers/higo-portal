import React, {useState} from 'react';
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';

function Map(props) {
    const [ selectedVehicle, setSelectedVehicle ] = useState(null);

    return (
        <GoogleMap defaultZoom={12} defaultCenter={{lat: -34.6705129, lng: -58.5628652}}>
            {
                props.mapData.length && props.mapData.map((vehicle) => {
                    return <Marker
                        key={vehicle.id}
                        position={{
                            lat: parseFloat(vehicle.locacion.latitud),
                            lng: parseFloat(vehicle.locacion.longitud)
                        }}
                        onClick={() => { setSelectedVehicle(vehicle) }}
                    />;
                })
            }

            {
                selectedVehicle && (
                    <InfoWindow
                        position={{
                            lat: parseFloat(selectedVehicle.locacion.latitud),
                            lng: parseFloat(selectedVehicle.locacion.longitud)
                        }}
                        onCloseClick={() => { setSelectedVehicle(null) }}
                    >
                        <p>Info de { selectedVehicle.id }</p>
                    </InfoWindow>
                )
            }
        </GoogleMap>
    );
}

const VehicleSearchMap = withScriptjs(
    withGoogleMap(Map)
);

export default VehicleSearchMap;