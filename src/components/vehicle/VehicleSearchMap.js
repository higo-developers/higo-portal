import React from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';
import VehicleResource from "../../resources/VehicleResource";
import { toPreparedSearchParams } from "../../utils/VehicleSearchUtils";

class Map extends React.Component {

    constructor(props) {
        super(props);

        let minDate = new Date();
        let maxDate = new Date();
        maxDate.setDate(minDate.getDate() + 1);

        this.state = {
            search: {
                fechaDesde: minDate,
                fechaHasta: maxDate
            },
            data: []
        };
    }

    componentDidMount() {
        this.fetchData(toPreparedSearchParams(this.state.search));
    }

    fetchData = async (params) => {
        try {
            const data = await VehicleResource.getByParams(params);

            this.setState({ data: data });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const vehicles = this.state.data;

        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{lat: -34.6705129, lng: -58.5628652}}
            >
                {
                    vehicles.length && vehicles.map((vehicle) => {
                        return <Marker
                            key={vehicle.id}
                            position={{
                                lat: parseFloat(vehicle.locacion.latitud),
                                lng: parseFloat(vehicle.locacion.longitud)
                            }}
                        />;
                    })
                }
            </GoogleMap>
        );
    }
}

const VehicleSearchMap = withScriptjs(
    withGoogleMap(Map)
);

export default VehicleSearchMap;