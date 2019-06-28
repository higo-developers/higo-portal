import React from 'react';
import Error from "../components/layout/Error";
import Loading from "../components/layout/Loading";
import VehicleResource from "../resources/VehicleResource";
import {locationDataAsArray} from "../utils/VehicleSearchUtils";

import ThumbnailImage from "../components/layout/ThumbnailImage";
import {toCurrency} from "../utils/FormatUtils";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../utils/AuthenticationUtils";
import GoBackButton from "../components/layout/GoBackButton";

const LOCATION_DATA_SEPARATOR = " - ";
const SEARCH_FECHA_DESDE_KEY = "fechaDesde";
const SEARCH_FECHA_HASTA_KEY = "fechaHasta";

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

        const urlSearchParams = new URLSearchParams(this.props.location.search);

        console.log(urlSearchParams.get(SEARCH_FECHA_DESDE_KEY));
        console.log(urlSearchParams.get(SEARCH_FECHA_HASTA_KEY));

        const pricePerHour = <p>
                                <span className="has-text-weight-semibold">Precio por hora: </span>
                                <span>{toCurrency(vehicle.precioHora, "ARS", "es-AR")}</span>
                             </p>;

        const doesNotInformPrice = <span className="tag is-medium">No informa precio</span>;

        const reserveButton = <Link className="card-footer-item is-size-4 has-text-dark" to={`/vehicles/${vehicle.id}/reserve`}>Reservar</Link>;
        const linkToLogin = <p className="card-footer-item"><span className="tag is-medium">Para reservar, debes <Link to="/login">&nbsp;iniciar sesi&oacute;n</Link></span></p>;

        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">&nbsp;</div>
                            <div className="level-right">
                                <GoBackButton />
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
                                        {isAuthenticated() ? reserveButton : linkToLogin}
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

                                {vehicle.precioHora ? pricePerHour : doesNotInformPrice}

                                {vehicle.equipamiento.length && (
                                    <div className="margin-top-1">
                                        <table className="table is-striped is-fullwidth">
                                            <thead>
                                                <tr>
                                                    <th>Equipamiento</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {vehicle.equipamiento.map((equip) => {
                                                return (<tr key={equip}>
                                                            <td>{equip}</td>
                                                        </tr>)
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}