import React, {useState} from 'react';
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';
import VehicleThumbnail from "./VehicleThumbnail";
import higoMapMarker from '../../media/images/higo-map-marker.png';

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
                        icon={{
                            url: higoMapMarker,
                            scaledSize: new window.google.maps.Size(45, 45)
                        }}
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
                        <VehicleThumbnail vehicle={selectedVehicle}/>
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