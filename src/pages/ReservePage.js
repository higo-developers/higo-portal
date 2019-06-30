import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import {decodeReserveDetails} from "../utils/ReserveUtils";
import ThumbnailImage from "../components/layout/ThumbnailImage";
import {locationDataAsArray} from "../utils/VehicleSearchUtils";
import {datetimeToDayMonYear, datetimeToHourMin} from "../utils/FormatUtils";
import OperationResource from "../resources/OperationResource";
import {Link} from "react-router-dom";
import {OperationStates} from "../utils/Constants";
import {isNotNullOrUndefined} from "../utils/Utils";

const SEARCH_DETAILS_KEY = "details";

export default class ReservePage extends React.Component {

    constructor(props) {
        super(props);

        const urlSearchParams = new URLSearchParams(this.props.location.search);

        this.state = {
            details: decodeReserveDetails(urlSearchParams.get(SEARCH_DETAILS_KEY)),
            loading: false,
            done: false,
            error: null
        };
    }

    doReserve = async () => {
        this.setState({loading: true, done: false});

        try {
            const response = await OperationResource.create(this.state.details);
            if (isNotNullOrUndefined(response.codEstado) && response.codEstado === OperationStates.APROBADO)
                this.setState({loading: false, error: null, done: true});
        } catch (error) {
            this.setState({loading: false, error: error, done: false});
        }
    };

    render() {
        const vehicle = this.state.details.vehicle;
        const fechaDesde = this.state.details.fechaDesde;
        const fechaHasta = this.state.details.fechaHasta;

        return (
            <React.Fragment>
                <section className="section">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">Confirmar solicitud de reserva</h1>
                            </div>
                            <div className="level-right">
                                <GoBackButton/>
                            </div>
                        </nav>

                        <div className="columns is-centered">
                            <div className="column is-half">
                                <div className="box has-text-centered">
                                    <ThumbnailImage src={vehicle.pathImagen}
                                                    alt={`${vehicle.id} - ${vehicle.marca} - ${vehicle.modelo}`}/>

                                    <br/>

                                    <p className="title">{vehicle.marca} {vehicle.modelo}</p>

                                    <p className="subtitle">de {vehicle.usuario.nombre}</p>

                                    <p className="has-text-grey">
                                        <i className="fas fa-map-marker-alt"></i>&nbsp; {locationDataAsArray(vehicle.locacion).join(" - ")}
                                    </p>

                                    <br/>

                                    <p>
                                        Desde el {datetimeToDayMonYear(fechaDesde)} a
                                        las {datetimeToHourMin(fechaDesde)} hasta
                                        el {datetimeToDayMonYear(fechaHasta)} a las {datetimeToHourMin(fechaHasta)}
                                    </p>

                                    <br/>

                                    {(!this.state.done && !this.state.error) && (
                                        <button name="Confirm" type="button"
                                                className={`button is-dark is-fullwidth is-medium ${this.state.loading && 'is-loading'} `}
                                                onClick={this.doReserve}>
                                            <span className="icon"><i className="fas fa-check"/></span>
                                            <span>Confirmar</span>
                                        </button>
                                    )}

                                    {this.state.done && (
                                        <article className="message is-success">
                                            <div className="message-body">
                                                <p>La solicitud de reserva ha sido creada.</p>
                                                <p><Link to={"/operaciones"}>Click aqu&iacute;</Link> para ver todas sus
                                                    operaciones.</p>
                                            </div>
                                        </article>
                                    )}

                                    {this.state.error && (
                                        <article className="message is-danger">
                                            <div className="message-body">{this.state.error.message}</div>

                                        </article>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}
