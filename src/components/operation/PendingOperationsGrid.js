import React from 'react';
import {datetimeToDayMonYearHourMin} from "../../utils/FormatUtils";
import {OperationRoles} from "../../utils/Constants";

export default class PendingOperationsGrid extends React.Component {
    render() {
        const hasData = this.props.data.length > 0;

        return (
            <React.Fragment>
                {hasData ? (
                    <table className="table is-striped is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>{(this.props.role === OperationRoles.PROVIDER) ? "Adquirente" : "Prestador"}</th>
                                <th>Vehiculo</th>
                                <th>Desde</th>
                                <th>Hasta</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        {this.props.data.map(operation => (
                            <tbody>
                                <tr>
                                    <td>{(this.props.role === OperationRoles.PROVIDER) ? operation.adquirente : operation.prestador}</td>
                                    <td>{operation.vehiculo}</td>
                                    <td>{datetimeToDayMonYearHourMin(operation.fechaHoraDesde)}</td>
                                    <td>{datetimeToDayMonYearHourMin(operation.fechaHoraHasta)}</td>
                                    <td>{operation.estado}</td>
                                    <td>
                                        <div className="buttons">
                                            <button className="button is-dark">
                                                <span><i className="fas fa-check"></i></span>&nbsp; Accion
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                ) : (
                    <div className="section">
                        <p className="has-text-centered">No hay operaciones pendientes.</p>
                    </div>
                )}
            </React.Fragment>
        );
    }
}