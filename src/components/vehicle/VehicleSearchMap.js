import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';

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
            loading: false,
            error: null,
            data: []
        };
    }

    componentDidMount() {
        console.log(this.state);
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{lat: -34.778340, lng: -58.448000}}
            />
        );
    }
}

const VehicleSearchMap = withScriptjs(
    withGoogleMap(Map)
);

export default VehicleSearchMap;