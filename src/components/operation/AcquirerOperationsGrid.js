import React from 'react';
import ChangeOperationStatusModal from "./ChangeOperationStatusModal";
import OperationResource from "../../resources/OperationResource";
import {datetimeToDayMonYearHourMin} from "../../utils/FormatUtils";
import {isNotNullOrUndefined} from "../../utils/Utils";

export default class AcquirerOperationsGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            expectedStatus: null,
            modalIsOpen: false,
            modalContent: null
        };

        this.toggleChangeStatusModal = this.toggleChangeStatusModal.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.changeOperationStatus = this.changeOperationStatus.bind(this);
    }

    toggleChangeStatusModal = () => {
        this.setState((prev, props) => {
            const isOpen = !prev.modalIsOpen;
            return {modalIsOpen: isOpen};
        });
    };

    handleResponse = (response) => {
        isNotNullOrUndefined(response.errorMessage) && this.setState({modalContent: <p>{response.errorMessage}</p>});

        response.codEstado === this.state.expectedStatus && this.setState({
            modalContent: <p><strong>Operaci&oacute;n {response.idOperacion}:</strong> &nbsp;{response.estado}</p>
        });

        this.setState({loading: false});

        this.toggleChangeStatusModal();
    };

    changeOperationStatus = async (operationId, status) => {
        this.setState({loading: true, expectedStatus: status, modalContent: ""});

        try {
            this.handleResponse(await OperationResource.changeStatus(operationId, status));
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <React.Fragment>
                <table className="table is-striped is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                        <th>Oepraci&oacute;n</th>
                        <th>Desde</th>
                        <th>Hasta</th>
                        <th>Prestador</th>
                        <th>Vehiculo</th>
                        <th>Estado</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.map(operation => (
                        <tr key={operation.idOperacion}>
                            <td>{operation.idOperacion}</td>
                            <td>{datetimeToDayMonYearHourMin(operation.fechaHoraDesde)}</td>
                            <td>{datetimeToDayMonYearHourMin(operation.fechaHoraHasta)}</td>
                            <td>{operation.prestador}</td>
                            <td>{operation.vehiculo}</td>
                            <td>{operation.estado}</td>
                            <td>
                                <div className="buttons">
                                    {operation.proximosEstados.length > 0 && operation.proximosEstados.map(estado => (
                                        <button
                                            key={estado.proximoEstado}
                                            className={`button is-dark`}
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

                <ChangeOperationStatusModal
                    onCloseModal={() => window.location.reload()}
                    modalState={this.state.modalIsOpen}
                    content={this.state.modalContent}
                />
            </React.Fragment>
        );
    }
}