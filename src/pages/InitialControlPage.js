import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import {datetimeToDayMonYearHourMin, toCurrency} from "../utils/FormatUtils";

export default class InitialControlPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            operation: this.props.history.location.state.operationResponse
        }
    }

    render() {
        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">Control de operaci&oacute;n {this.state.operation.idOperacion}</h1>
                            </div>

                            <div className="level-right">
                                <div className="level-item">
                                    <GoBackButton/>
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="box">
                            <div className="columns is-multiline">
                                <div className="column has-text-justified is-full">
                                    <h3 className="title is-4">{this.state.operation.vehiculo}</h3>
                                </div>
                                <div className="column has-text-justified is-one-third">
                                    <p>
                                        <strong>Desde:</strong>
                                    </p>
                                    <p>
                                        {datetimeToDayMonYearHourMin(this.state.operation.fechaHoraDesde)}
                                    </p>
                                </div>
                                <div className="column has-text-justified is-one-third">
                                    <p>
                                        <strong>Hasta:</strong>
                                    </p>
                                    <p>
                                        {datetimeToDayMonYearHourMin(this.state.operation.fechaHoraHasta)}
                                    </p>
                                </div>
                                <div className="column has-text-justified is-one-third">
                                    <p>
                                        <strong>Monto acordado:</strong>
                                    </p>
                                    <p>
                                        {toCurrency(this.state.operation.montoAcordado, "ARS", "es-AR")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}