import React from 'react';
import { Link } from "react-router-dom";
import { toCurrency } from "../../utils/FormatUtils";

import './VehicleThumbnail.css';
import defaultBannerThumbnail from '../../media/images/higo-vehiculo-thumbnail-comp.png';

const NO_INFORMA_PRECIO = "No informa precio";

export default class VehicleThumbnail extends React.Component {
    render() {
        const vehicle = this.props.vehicle;
        const vehicleImgSource = (vehicle.pathImagen) ? vehicle.pathImagen : defaultBannerThumbnail;

        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-3by2 has-background-dark">
                            <img src={vehicleImgSource} alt={vehicle.id}/>
                        </figure>
                    </div>

                    <div className="card-content">
                        <p className="title">{vehicle.marca} {vehicle.modelo}</p>

                        { vehicle.locacion.localidad && (<p className="subtitle">{vehicle.locacion.localidad}</p>) }

                        { vehicle.locacion.provincia && vehicle.locacion.pais && (
                            <p className="subtitle is-6">{vehicle.locacion.provincia} - {vehicle.locacion.pais}</p>
                        )}

                        <div className="content">
                            {
                                vehicle.precioHora ?
                                    (
                                        <p>
                                            <span className="has-text-weight-semibold">Precio por hora: </span>
                                            <span>{ toCurrency(vehicle.precioHora, "ARS", "es-AR") }</span>
                                        </p>
                                    ) : (
                                        <span className="tag">{ NO_INFORMA_PRECIO }</span>
                                    )
                            }
                        </div>
                    </div>

                    <footer className="card-footer">
                        <Link className="card-footer-item" to={`/vehicles/${vehicle.id}`}>Ver m&aacute;s</Link>
                    </footer>
                </div>
            </React.Fragment>
        );
    }
}