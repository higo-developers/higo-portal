import React from 'react';
import VehicleSearchForm from "../components/vehicle/VehicleSearchForm";
import VehicleSearchMap from "../components/vehicle/VehicleSearchMap";

export default class VehicleSearchPage extends React.Component {

    handleSearch = (encodedSearch) => {
        this.props.history.push({
            pathname: "/vehicles",
            search: `search=${encodedSearch}`
        });
    };

    render() {
        return (
            <React.Fragment>
                <section className="hero is-medium higo-banner-bg">
                    <div className="hero-body">
                        <div className="container">
                            <div className="box padding-2">
                                <div className="level">
                                    <div className="level-left">
                                        <p className="title">Busc&aacute; un veh&iacute;culo</p>
                                    </div>
                                    <div className="level-right">
                                        <p className="has-text-grey-light">* Campos obligatorios</p>
                                    </div>
                                </div>
                                <VehicleSearchForm onSearch={this.handleSearch}/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="hero is-medium is-light">
                    <div className="hero-body">
                        <div className="container">
                            <p className="title">Veh&iacute;culos cercanos</p>

                            <VehicleSearchMap
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                                loadingElement={ <div style={{height: `100%`}}/> }
                                containerElement={ <div style={{height: `75vh`}}/> }
                                mapElement={ <div style={{height: `100%`}}/> }
                            />
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}