import React from 'react';
import {OperationRoles} from "../../utils/Constants";
import {datetimeToDayMonYearHourMin} from "../../utils/FormatUtils";

const TH_ACQUIRER = "Adquirente";
const TH_PROVIDER = "Prestador";

export default class OperationsGrid extends React.Component {
    render() {
        const hasData = this.props.data.length > 0;

        return (
            <React.Fragment>
                {hasData ? (
                    <table className="table is-striped is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>{(this.props.role === OperationRoles.PROVIDER) ? TH_ACQUIRER : TH_PROVIDER}</th>
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
                                <td>{(this.props.role === OperationRoles.PROVIDER) ? operation.adquirente : operation.prestador}</td>
                                <td>{operation.vehiculo}</td>
                                <td>{datetimeToDayMonYearHourMin(operation.fechaHoraDesde)}</td>
                                <td>{datetimeToDayMonYearHourMin(operation.fechaHoraHasta)}</td>
                                <td>{operation.estado}</td>
                                <td>
                                    <div className="buttons">
                                        {operation.proximosEstados.length > 0 && operation.proximosEstados.map(estado => (
                                            <button key={estado.proximoEstado} className="button is-dark">
                                                {estado.descripcionAccion}
                                            </button>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="section">
                        <p className="has-text-centered">{this.props.emptyDataMessage}</p>
                    </div>
                )}
            </React.Fragment>
        );
    }
}