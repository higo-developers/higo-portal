import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
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