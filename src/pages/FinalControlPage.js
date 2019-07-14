import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import OperationSummary from "../components/operation/control/OperationSummary";
import OperationResource from "../resources/OperationResource";
import {handlePossibleErrorResponse} from "../utils/Utils";
import InitialControlSummary from "../components/operation/control/InitialControlSummary";
import ControlForm from "../components/operation/control/ControlForm";
import ChangeOperationStatusModal from "../components/operation/ChangeOperationStatusModal";
import {Routes} from "../utils/Constants";

export default class FinalControlPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            disabledSubmitButton: false,
            operation: this.props.history.location.state.operationResponse,
            modalIsOpen: false,
            modalContent: null,
            previousControl: {},
            currentControl: {},
        };

        this.getOperationControl = this.getOperationControl.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buildControlRequestBody = this.buildControlRequestBody.bind(this);
        this.toggleChangeStatusModal = this.toggleChangeStatusModal.bind(this);
    }

    componentDidMount() {
        this.getOperationControl();
    }

    getOperationControl = async () => {
        try {
            const response = await OperationResource.getOperationInitialControl(this.state.operation.idOperacion);

            handlePossibleErrorResponse(response);

            this.setState({
                previousControl: response,
                currentControl: {
                    fuelLevel: response.nivelCombustibleInicial,
                    externalHygieneLevel: response.higieneExternaInicial,
                    internalHygieneLevel: response.higieneInternaInicial,
                    performance: response.funcionamientoGeneralInicial
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    toggleChangeStatusModal = () => {
        this.setState((prev, props) => {
            const isOpen = !prev.modalIsOpen;
            return {modalIsOpen: isOpen};
        });
    };

    handleChange = (event) => {
        this.setState({
            currentControl: {
                ...this.state.currentControl,
                [event.target.name]: event.target.value
            }
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, disabledSubmitButton: true });

        try {
            const response = await OperationResource.updateControl(this.buildControlRequestBody());

            handlePossibleErrorResponse(response);

            this.setState({
                modalContent: (
                    <React.Fragment>
                        <p>
                            <strong>Operaci&oacute;n {response.idOperacion}:</strong> &nbsp;{response.estadoOperacion}
                        </p>
                        <p>{response.mensaje}</p>
                    </React.Fragment>
                )
            });
        } catch (error) {
            console.log(error);
            this.setState({ modalContent: <p>{error.message}</p> });
        }

        this.setState({ loading: false });
        this.toggleChangeStatusModal();
    };

    buildControlRequestBody = () => {
        const currentControl = this.state.currentControl;
        const control = this.state.previousControl;

        control.funcionamientoGeneralFinal = currentControl.performance;
        control.higieneExternaFinal = currentControl.externalHygieneLevel;
        control.higieneInternaFinal = currentControl.internalHygieneLevel;
        control.nivelCombustibleFinal = currentControl.fuelLevel;

        return control;
    };

    render() {
        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">Control final de operaci&oacute;n {this.state.operation.idOperacion}</h1>
                            </div>

                            <div className="level-right">
                                <div className="level-item">
                                    <GoBackButton />
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="section padding-bottom-0">
                    <div className="container">
                        <OperationSummary operation={this.state.operation} />
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <InitialControlSummary control={this.state.previousControl}/>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <ControlForm
                            control={this.state.currentControl}
                            loading={this.state.loading}
                            disabledSubmitButton={this.state.disabledSubmitButton}
                            onHandleChange={this.handleChange}
                            onHandleSubmit={this.handleSubmit}
                        />
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