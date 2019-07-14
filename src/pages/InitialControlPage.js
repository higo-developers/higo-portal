import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import ControlOperationSummary from "../components/operation/ControlOperationSummary";
import {FuelLevels, GeneralPerformance, HygieneLevels, Routes} from "../utils/Constants";
import OperationResource from "../resources/OperationResource";
import {handlePossibleErrorResponse} from "../utils/Utils";
import ChangeOperationStatusModal from "../components/operation/ChangeOperationStatusModal";
import ControlForm from "../components/operation/control/ControlForm";

export default class InitialControlPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            disabledSubmitButton: false,
            operation: this.props.history.location.state.operationResponse,
            modalIsOpen: false,
            modalContent: null,
            control: {
                fuelLevel: FuelLevels.ALTO,
                externalHygieneLevel: HygieneLevels.BUENO,
                internalHygieneLevel: HygieneLevels.BUENO,
                performance: GeneralPerformance.BUENO
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.buildControlRequestBody = this.buildControlRequestBody.bind(this);
        this.toggleChangeStatusModal = this.toggleChangeStatusModal.bind(this);
    }

    toggleChangeStatusModal = () => {
        this.setState((prev, props) => {
            const isOpen = !prev.modalIsOpen;
            return {modalIsOpen: isOpen};
        });
    };

    handleChange = (event) => {
        this.setState({
            control: {
                ...this.state.control,
                [event.target.name]: event.target.value
            }
        });
    };

    buildControlRequestBody = () => {
        return {
            idOperacion: this.state.operation.idOperacion,
            nivelCombustibleInicial: this.state.control.fuelLevel,
            higieneExternaInicial: this.state.control.externalHygieneLevel,
            higieneInternaInicial: this.state.control.internalHygieneLevel,
            funcionamientoGeneralInicial: this.state.control.performance
        };
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, disabledSubmitButton: true});

        try {
            const response = await OperationResource.createInitialControl(this.state.operation.idOperacion, this.buildControlRequestBody());

            handlePossibleErrorResponse(response);

            this.setState({
                modalContent: <p><strong>Operaci&oacute;n {response.idOperacion}:</strong> &nbsp;{response.estadoOperacion}</p>
            });
        } catch (error) {
            console.log(error);

            this.setState({ modalContent: <p>{error.message}</p> });
        }

        this.setState({loading: false});
        this.toggleChangeStatusModal();
    };

    render() {
        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">Control de operaci&oacute;n {this.state.operation.idOperacion}</h1>
                            </div>

                            <div className="level-right">
                                <div className="level-item">
                                    <GoBackButton/>
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <ControlOperationSummary operation={this.state.operation}/>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <ControlForm
                            control={this.state.control}
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