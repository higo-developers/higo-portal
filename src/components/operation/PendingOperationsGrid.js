import React from 'react';
import {datetimeToDayMonYearHourMin} from "../../utils/FormatUtils";
import {OperationRoles} from "../../utils/Constants";

const TH_ADQUIRENTE = "Adquirente";
const TH_PRESTADOR = "Prestador";

export default class PendingOperationsGrid extends React.Component {
    render() {
        const hasData = this.props.data.length > 0;

        return (
            <React.Fragment>
                {hasData ? (
                    <table className="table is-striped is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>{(this.props.role === OperationRoles.PROVIDER) ? TH_ADQUIRENTE : TH_PRESTADOR}</th>
                                <th>Vehiculo</th>
                                <th>Desde</th>
                                <th>Hasta</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        {this.props.data.map(op => (
                            <tbody>
                                <tr>
                                    <td>{(this.props.role === OperationRoles.PROVIDER) ? op.adquirente : op.prestador}</td>
                                    <td>{op.vehiculo}</td>
                                    <td>{datetimeToDayMonYearHourMin(op.fechaHoraDesde)}</td>
                                    <td>{datetimeToDayMonYearHourMin(op.fechaHoraHasta)}</td>
                                    <td>{op.estado}</td>
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