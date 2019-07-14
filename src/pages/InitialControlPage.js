import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import ControlOperationSummary from "../components/operation/ControlOperationSummary";
import {FuelLevels, GeneralPerformance, HygieneLevels} from "../utils/Constants";

export default class InitialControlPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            operation: this.props.history.location.state.operationResponse,
            control: {
                fuelLevel: FuelLevels.ALTO,
                externalHygieneLevel: HygieneLevels.BUENO,
                internalHygieneLevel: HygieneLevels.BUENO,
                performance: GeneralPerformance.BUENO
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

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

    handleSubmit = (event) => {
        event.preventDefault();
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
                                            <button type="submit" className={`button is-dark ${this.state.loading && 'is-loading'}`}>
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
            </React.Fragment>
        );
    }
}