import React from 'react';
import {datetimeToDayMonYearHourMin} from "../../utils/FormatUtils";

export default class ProviderOperationsGrid extends React.Component {
    constructor(props) {
        super(props);

        this.openUserDetails = this.openUserDetails.bind(this);
    }

    /* TODO - Implementar método que abra modal con detalle de adquirente (NTH) */
    openUserDetails = (userId) => {
        console.log(`${new Date().toLocaleString()} - Mostrar detalle de usario ${userId}`);
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
            </React.Fragment>
        );
    }
}