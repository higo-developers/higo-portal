import React from 'react';
import VehicleSearchMap from "../components/vehicle/VehicleSearchMap";
import VehicleResource from "../resources/VehicleResource";
import {Link} from "react-router-dom";

export default class VehicleSearchMapPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapData: []
        }
    }

    componentDidMount() {
        this.getDataForMap();
    }

    getDataForMap = async () => {
        try {
            const data = await VehicleResource.getDataForMap();
            this.setState({ mapData: data });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <React.Fragment>
                <section className="hero is-fullheight-with-navbar higo-banner-bg">
                    <div className="hero-body">
                        <div className="container">
                            <div className="box padding-2">
                            <div className="level">
                                <div className="level-left">
                                    <p className="title">Veh&iacute;culos cercanos</p>
                                </div>
                                <div className="level-right">
                                    <Link className="button is-light" to="/search">
                                        <i className="fas fa-filter"></i>&nbsp; Filtrar b&uacute;squeda
                                    </Link>
                                </div>
                            </div>

                            <VehicleSearchMap
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                                loadingElement={<div style={{height: `100%`}}/>}
                                containerElement={<div style={{height: `70vh`}}/>}
                                mapElement={<div style={{height: `100%`}}/>}
                                mapData={this.state.mapData}
                            />
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}