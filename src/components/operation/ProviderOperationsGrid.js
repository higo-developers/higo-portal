import React from 'react';
import {datetimeToDayMonYearHourMin} from "../../utils/FormatUtils";
import OperationResource from "../../resources/OperationResource";

export default class ProviderOperationsGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };

        this.openUserDetails = this.openUserDetails.bind(this);
        this.changeOperationStatus = this.changeOperationStatus.bind(this);
    }

    /* TODO - Implementar método que abra modal con detalle de adquirente (NTH) */
    openUserDetails = (userId) => {
        console.log(`${new Date().toLocaleString()} - Mostrar detalle de usario ${userId}`);
    };

    changeOperationStatus = (operationId, status) => {
        this.setState({loading: true});
        OperationResource.changeStatus(operationId, status);
    };

    render() {
        return (
            <React.Fragment>
                <table className="table is-striped is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                        <th>Adquirente</th>
                        <th>Vehiculo</th>
                        <th>Desde</th>
                        <th>Hasta</th>
                        <th>Estado</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.map(operation => (
                        <tr key={operation.idOperacion}>
                            <td className="has-cursor-pointer" onClick={() => this.openUserDetails(operation.idAdquiriente)} >
                                {operation.adquirente}
                                <span className="icon is-pulled-right">
                                    <i className="fas fa-info-circle"></i>
                                </span>
                            </td>
                            <td>{operation.vehiculo}</td>
                            <td>{datetimeToDayMonYearHourMin(operation.fechaHoraDesde)}</td>
                            <td>{datetimeToDayMonYearHourMin(operation.fechaHoraHasta)}</td>
                            <td>{operation.estado}</td>
                            <td>
                                <div className="buttons">
                                    {operation.proximosEstados.length > 0 && operation.proximosEstados.map(estado => (
                                        <button
                                            className={`button is-dark`}
                                            key={estado.proximoEstado}
                                            onClick={() => this.changeOperationStatus(operation.idOperacion, estado.proximoEstado)}
                                            disabled={this.state.loading}
                                        >
                                            {estado.descripcionAccion}
                                        </button>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}