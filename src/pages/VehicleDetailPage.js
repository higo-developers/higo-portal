import React from 'react';
import Error from "../components/layout/Error";
import Loading from "../components/layout/Loading";
import VehicleResource from "../resources/VehicleResource";
import {locationDataAsArray} from "../utils/VehicleSearchUtils";

import ThumbnailImage from "../components/layout/ThumbnailImage";
import {toCurrency} from "../utils/FormatUtils";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../utils/AuthenticationUtils";

const LOCATION_DATA_SEPARATOR = " - ";

export default class VehicleDetailPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicleId: this.props.match.params.id,
            loading: true,
            error: null,
            data: {}
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const data = await VehicleResource.getById(this.state.vehicleId);
            this.setState({ loading: false, data: data });
        } catch (error) {
            console.log(error);
            this.setState({ loading: false, error: error });
        }
    };

    render() {
        if (this.state.loading) {
            return <Loading />;
        }

        if (this.state.error) {
            return <Error />;
        }

        const vehicle = this.state.data;

        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">&nbsp;</div>
                            <div className="level-right">
                                <button onClick={() => { this.props.history.goBack() }} className="button is-dark"><i className="fas fa-arrow-left"></i>&nbsp; Volver</button>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-half">
                                <div className="card">
                                    <div className="card-image">
                                        <ThumbnailImage src={vehicle.pathImagen} alt={`${vehicle.id} - ${vehicle.marca} - ${vehicle.modelo}`} />
                                    </div>
                                    <footer className="card-footer">
                                        {
                                            isAuthenticated()   ? <Link className="card-footer-item is-size-4 has-text-dark" to={`/vehicles/${vehicle.id}/reserve`}>Reservar</Link>
                                                                : <p className="card-footer-item"><span className="tag is-medium">Para reservar, debes iniciar sesi&oacute;n</span></p>
                                        }
                                    </footer>
                                </div>
                            </div>
                            <div className="column is-half">
                                <p className="title">{vehicle.marca} {vehicle.modelo}</p>

                                <p className="subtitle is-6 has-text-grey">
                                    <i className="fas fa-map-marker-alt"></i>&nbsp; { locationDataAsArray(vehicle.locacion).join(LOCATION_DATA_SEPARATOR) }
                                </p>

                                <p className="title is-5 margin-top-1">
                                    <i className="fas fa-user-circle"></i>&nbsp; {vehicle.usuario.nombre}
                                </p>

                                {
                                    vehicle.precioHora ?
                                        (
                                            <p>
                                                <span className="has-text-weight-semibold">Precio por hora: </span>
                                                <span>{toCurrency(vehicle.precioHora, "ARS", "es-AR")}</span>
                                            </p>
                                        ) : (
                                            <span className="tag is-medium">No informa precio</span>
                                        )
                                }

                                {
                                    vehicle.equipamiento.length && (
                                        <div className="margin-top-1">
                                            <table className="table is-striped is-fullwidth">
                                                <thead>
                                                <tr>
                                                    <th>Equipamiento</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    vehicle.equipamiento.map((eq) => {
                                                        return (
                                                            <tr key={eq}>
                                                                <td>{eq}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}