import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";

export default class ProfileVehiclesPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <section className="section">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">Veh&iacute;culos</h1>
                            </div>
                            <div className="level-right">
                                <GoBackButton/>
                            </div>
                        </nav>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}