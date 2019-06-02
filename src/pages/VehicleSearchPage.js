import React from 'react';
import VehicleSearchForm from "../components/vehicle/VehicleSearchForm";

export default class VehicleSearchPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="section higo-gradient-bg">
                    <div className="container">
                        <div className="card">
                            <div className="card-content">
                                <div className="content">
                                    <VehicleSearchForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}