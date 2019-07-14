import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import ControlOperationSummary from "../components/operation/ControlOperationSummary";
import {FuelLevels, GeneralPerformance, HygieneLevels, Routes} from "../utils/Constants";
import OperationResource from "../resources/OperationResource";
import {handlePossibleErrorResponse} from "../utils/Utils";
import ChangeOperationStatusModal from "../components/operation/ChangeOperationStatusModal";

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
        const target = event.target;

        const value = target.value;
        const name = target.name;

        this.setState({
            control: {
                ...this.state.control,
                [name]: value
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
                        <form onSubmit={this.handleSubmit}>
                            <div className="columns is-multiline">
                                <div className="column is-one-quarter">
                                    <div className="columns is-multiline">
                                        <div className="column is-full">
                                            <p className="subtitle">Nivel de combustible</p>
                                        </div>
                                        <div className="column is-full">
                                            <div className="field is-grouped-multiline">
                                                {Object.values(FuelLevels).map((fuelLevel) => {
                                                    return (
                                                        <div className="control" key={fuelLevel}>
                                                            <label className="radio">
                                                                <input type="radio" name="fuelLevel" checked={fuelLevel === this.state.control.fuelLevel} onChange={this.handleChange} value={fuelLevel} />&nbsp; {fuelLevel}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="column is-one-quarter">
                                    <div className="columns is-multiline">
                                        <div className="column is-full">
                                            <p className="subtitle">Higiene externa</p>
                                        </div>
                                        <div className="column is-full">
                                            <div className="field is-grouped-multiline">
                                                {Object.values(HygieneLevels).map((hygieneLevel) => {
                                                    return (
                                                        <div className="control" key={hygieneLevel}>
                                                            <label className="radio">
                                                                <input type="radio" name="externalHygieneLevel" checked={hygieneLevel === this.state.control.externalHygieneLevel} onChange={this.handleChange} value={hygieneLevel} />&nbsp; {hygieneLevel}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="column is-one-quarter">
                                    <div className="columns is-multiline">
                                        <div className="column is-full">
                                            <p className="subtitle">Higiene interna</p>
                                        </div>
                                        <div className="column is-full">
                                            <div className="field is-grouped-multiline">
                                                {Object.values(HygieneLevels).map((hygieneLevel) => {
                                                    return (
                                                        <div className="control" key={hygieneLevel}>
                                                            <label className="radio">
                                                                <input type="radio" name="internalHygieneLevel" checked={hygieneLevel === this.state.control.internalHygieneLevel} onChange={this.handleChange} value={hygieneLevel} />&nbsp; {hygieneLevel}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="column is-one-quarter">
                                    <div className="columns is-multiline">
                                        <div className="column is-full">
                                            <p className="subtitle">Funcionamiento general</p>
                                        </div>
                                        <div className="column is-full">
                                            <div className="field is-grouped-multiline">
                                                {Object.values(GeneralPerformance).map((performance) => {
                                                    return (
                                                        <div className="control" key={performance}>
                                                            <label className="radio">
                                                                <input type="radio" name="performance" checked={performance === this.state.control.performance} onChange={this.handleChange} value={performance} />&nbsp; {performance}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="column is-full">
                                    <div className="field is-grouped">
                                        <div className="control">
                                            <button type="submit" className={`button is-dark ${this.state.loading && 'is-loading'}`} disabled={this.state.disabledSubmitButton}>
                                                <span className="icon"><i className="fas fa-check" /></span>
                                                <span>Confirmar</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
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