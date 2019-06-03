import React from 'react';
import VehicleSearchForm from "../components/vehicle/VehicleSearchForm";

export default class VehicleSearchPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="section higo-bg">
                    <div className="container">
                        <div className="box">
                            <p className="title">Busc&aacute; un veh&iacute;culo</p>
                            <VehicleSearchForm/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}