import React from 'react';
import {Link} from "react-router-dom";
import {toCurrency} from "../../utils/FormatUtils";
import ThumbnailImage from "../layout/ThumbnailImage";
import {isNotNullOrUndefined} from "../../utils/Utils";

export default class VehicleThumbnail extends React.Component {
    render() {
        const vehicle = this.props.vehicle;

        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-image">
                        <ThumbnailImage src={vehicle.pathImagen} alt={`${vehicle.id} - ${vehicle.marca} - ${vehicle.modelo}`} />
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
                                        <span className="tag">No informa precio</span>
                                    )
                            }
                        </div>
                    </div>

                    <footer className="card-footer">
                        <Link className="card-footer-item" to={ this.buildVehicleDetailPath(vehicle) } >
                            Ver m&aacute;s
                        </Link>
                    </footer>
                </div>
            </React.Fragment>
        );
    }

    buildVehicleDetailPath(vehicle) {
        const path = {pathname: `/vehicles/${vehicle.id}`};

        if ( isNotNullOrUndefined(this.props.dateTimes) )
            path.search = `fechaDesde=${this.props.dateTimes.fechaDesde}&fechaHasta=${this.props.dateTimes.fechaHasta}`

        return path;
    }
}