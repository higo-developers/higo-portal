import React from 'react';
import VehicleSearchForm from "../components/vehicle/VehicleSearchForm";

export default class VehicleSearchPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <section className="hero is-medium higo-banner-bg">
                    <div className="hero-body">
                        <div className="container">
                            <div className="box padding-2">
                                <p className="title">Busc&aacute; un veh&iacute;culo</p>
                                <VehicleSearchForm/>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}