import React from 'react';
import {datetimeToDayMonYearHourMin, toCurrency} from "../../../utils/FormatUtils";
import OperationResource from "../../../resources/OperationResource";

export default class OperationPaymentSummary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            control: null
        };

        this.getOperationControl = this.getOperationControl.bind(this);
    }

    componentDidMount() {
        this.getOperationControl(this.props.operation.idOperacion);
    }

    getOperationControl = async (operationId) => {
        try {
            const response = await OperationResource.getOperationControl(operationId);
            this.setState({control: response});
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="box">
                    <div className="columns is-multiline has-text-centered">
                        <div className="column is-full">
                            <h3 className="title is-4">{this.props.operation.vehiculo} alquilado a {this.props.operation.adquirente}</h3>
                        </div>

                        <div className="column has-text-centered is-one-third">
                            <p>
                                <strong>Desde:</strong>
                                <br/>
                                {datetimeToDayMonYearHourMin(this.props.operation.fechaHoraDesde)}
                            </p>
                        </div>

                        <div className="column has-text-centered is-one-third">
                            <p>
                                <strong>Hasta:</strong>
                                <br/>
                                {datetimeToDayMonYearHourMin(this.props.operation.fechaHoraHasta)}
                            </p>
                        </div>

                        <div className="column has-text-centered is-one-third">
                            <p>
                                <strong>Monto acordado:</strong>
                                <br/>
                                {toCurrency(this.props.operation.montoAcordado, "ARS", "es-AR")}
                            </p>
                        </div>

                        {this.state.control && (
                            <div className="column is-full">
                                <table className="table is-bordered is-fullwidth table is-striped has-centered-content">
                                    <thead>
                                        <tr>
                                            <th>Control</th>
                                            <th>Inicial</th>
                                            <th>Final</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Nivel de combustible</th>
                                            <td>{this.state.control.nivelCombustibleInicial}</td>
                                            <td>{this.state.control.nivelCombustibleFinal}</td>
                                        </tr>
                                        <tr>
                                            <th>Higiene externa</th>
                                            <td>{this.state.control.higieneExternaInicial}</td>
                                            <td>{this.state.control.higieneExternaFinal}</td>
                                        </tr>
                                        <tr>
                                            <th>Higiene interna</th>
                                            <td>{this.state.control.higieneInternaInicial}</td>
                                            <td>{this.state.control.higieneInternaFinal}</td>
                                        </tr>
                                        <tr>
                                            <th>Funcionamiento general</th>
                                            <td>{this.state.control.funcionamientoGeneralInicial}</td>
                                            <td>{this.state.control.funcionamientoGeneralFinal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="column has-text-centered is-full">
                            <p className="subtitle has-background-grey-lighter padding-1">
                                <strong>Monto final:</strong>
                                <br/>
                                <span className="is-size-3">{toCurrency(this.props.operation.montoEfectivo, "ARS", "es-AR")}</span>
                            </p>
                        </div>

                        <div className="column is-full">
                            <button className="button is-dark is-medium is-fullwidth">
                                <span className="icon"><i className="fas fa-check"></i></span>
                                <span>Confirmar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
            ;
    }
}