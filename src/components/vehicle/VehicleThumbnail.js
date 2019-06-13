import React from 'react';
import { Link } from "react-router-dom";

export default class VehicleThumbnail extends React.Component {

    render() {
        const vehicle = this.props.vehicle;

        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-3by2">
                            <img src="https://bulma.io/images/placeholders/480x320.png" alt={vehicle.id}/>
                        </figure>
                    </div>

                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-4">{vehicle.marca} {vehicle.modelo}</p>
                                { vehicle.locacion.localidad && (<p className="subtitle is-6">{vehicle.locacion.localidad}</p>) }
                            </div>
                        </div>
                        {/*<div className="content"></div>*/}
                    </div>

                    <footer className="card-footer">
                        <Link className="card-footer-item" to={`/vehicles/${vehicle.id}`}>Ver m&aacute;s</Link>
                    </footer>
                </div>
            </React.Fragment>
        );
    }
}