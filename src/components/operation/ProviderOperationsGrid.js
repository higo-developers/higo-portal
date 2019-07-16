import React from 'react';
import {datetimeToDayMonYearHourMin} from "../../utils/FormatUtils";
import OperationResource from "../../resources/OperationResource";
import {isNotNullOrUndefined} from "../../utils/Utils";
import ChangeOperationStatusModal from "./ChangeOperationStatusModal";
import {OperationStates} from "../../utils/Constants";
import UserDetailModal from "../user/UserDetailModal";
import UserResource from "../../resources/UserResource";

const USER_DETAILS_MODAL_TITLE = "Detalle de usuario";

export default class ProviderOperationsGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            expectedStatus: null,
            modalIsOpen: false,
            modalContent: null,
            userModalIsOpen: false,
            userToDetail: null
        };

        this._isMounted = false;

        this.openUserDetails = this.openUserDetails.bind(this);
        this.changeOperationStatus = this.changeOperationStatus.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.toggleUserDetailModal = this.toggleUserDetailModal.bind(this);
        this.toggleChangeStatusModal = this.toggleChangeStatusModal.bind(this);
        this.handleRedirectCases = this.handleRedirectCases.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    openUserDetails = async (userId) => {
        try {
            const response = await UserResource.getById(userId);
            this._isMounted && this.setState({userToDetail: response});
        } catch (error) {
            console.error(error);
            this._isMounted && this.setState({userToDetail: null})
        }

        this.toggleUserDetailModal();
    };

    toggleUserDetailModal = () => {
        let isOpen = false;

        this.setState((prev, props) => {
            isOpen = !prev.userModalIsOpen;
            return {userModalIsOpen: isOpen};
        });

        if (!isOpen) this.setState({userToDetail: null});
    };

    toggleChangeStatusModal = () => {
        this.setState((prev, props) => {
            const isOpen = !prev.modalIsOpen;
            return {modalIsOpen: isOpen};
        });
    };

    handleResponse = (response) => {
        isNotNullOrUndefined(response.errorMessage) && this.setState({modalContent: <p>{response.errorMessage}</p>});

        this.handleRedirectCases(response);

        response.codEstado === this.state.expectedStatus && this.setState({
            modalContent: <p><strong>Operaci&oacute;n {response.idOperacion}:</strong> &nbsp;{response.estado}</p>
        });

        this.setState({loading: false});

        this.toggleChangeStatusModal();
    };

    handleRedirectCases = (response) => {
        (response.codEstado === OperationStates.CONTROL_INICIAL
            || response.codEstado === OperationStates.CONTROL_FINAL
            || response.codEstado === OperationStates.CONFIRMACION_PAGO)
        && this.props.onRedirectCases(response, response.codEstado);
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
                        <th>Operaci&oacute;n</th>
                        <th>Desde</th>
                        <th>Hasta</th>
                        <th>Adquirente</th>
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
                            <td className="has-cursor-pointer" onClick={() => this.openUserDetails(operation.idAdquiriente)} >
                                {operation.adquirente}
                                <span className="icon is-pulled-right">
                                    <i className="fas fa-info-circle"></i>
                                </span>
                            </td>
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

                <UserDetailModal
                    onCloseModal={this.toggleUserDetailModal}
                    modalState={this.state.userModalIsOpen}
                    title={USER_DETAILS_MODAL_TITLE}
                    user={this.state.userToDetail}
                />
            </React.Fragment>
        );
    }
}