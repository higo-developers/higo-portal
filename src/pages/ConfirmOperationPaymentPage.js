import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import OperationPaymentSummary from "../components/operation/payment/OperationPaymentSummary";
import {OperationStates, Routes} from "../utils/Constants";
import OperationResource from "../resources/OperationResource";
import {handlePossibleErrorResponse} from "../utils/Utils";
import ChangeOperationStatusModal from "../components/operation/ChangeOperationStatusModal";

export default class ConfirmOperationPaymentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            done: false,
            error: null,
            operation: this.props.history.location.state.operationResponse,
            modalIsOpen: false,
            modalContent: null
        };

        this.handleClick = this.handleClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal = () => {
        this.setState((prev, props) => {
            const isOpen = !prev.modalIsOpen;
            return {modalIsOpen: isOpen};
        });
    };

    handleClick = async () => {
        this.setState({loading: true});

        try {
            const response = await OperationResource.changeStatus(this.state.operation.idOperacion, OperationStates.FINALIZADO);
            handlePossibleErrorResponse(response);
            this.setState({modalContent: <p><strong>Operaci&oacute;n {response.idOperacion}:</strong> &nbsp;{response.estado}</p>});
        } catch (error) {
            this.setState({modalContent: <p>{error.message}</p>});
        }

        this.setState({loading: false, done: true});

        this.toggleModal();
    };

    render() {
        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">Operaci&oacute;n {this.state.operation.idOperacion}: Confirmaci&oacute;n de pago</h1>
                            </div>

                            <div className="level-right">
                                <div className="level-item">
                                    <GoBackButton />
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-two-thirds">
                                <OperationPaymentSummary operation={this.state.operation}/>

                                {!this.state.done && (
                                    <button className={`button is-dark is-large is-fullwidth ${ this.state.loading && "is-loading" }`} onClick={this.handleClick}>
                                        <span className="icon"><i className="fas fa-check"></i></span>
                                        <span>Confirmar</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <ChangeOperationStatusModal
                    onCloseModal={() => this.props.history.push(Routes.OPERATIONS)}
                    modalState={this.state.modalIsOpen}
                    content={this.state.modalContent}
                />
            </React.Fragment>
        );
    }
}