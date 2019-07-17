import React from 'react';
import {FuelLevels, GeneralPerformance, HygieneLevels} from "../../../utils/Constants";

export default class ControlForm extends React.Component {
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.props.onHandleSubmit}>
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
                                                        <input type="radio" name="fuelLevel" checked={fuelLevel === this.props.control.fuelLevel} onChange={this.props.onHandleChange} value={fuelLevel} />&nbsp; {fuelLevel}
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
                                                        <input type="radio" name="externalHygieneLevel" checked={hygieneLevel === this.props.control.externalHygieneLevel} onChange={this.props.onHandleChange} value={hygieneLevel} />&nbsp; {hygieneLevel}
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
                                                        <input type="radio" name="internalHygieneLevel" checked={hygieneLevel === this.props.control.internalHygieneLevel} onChange={this.props.onHandleChange} value={hygieneLevel} />&nbsp; {hygieneLevel}
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
                                                        <input type="radio" name="performance" checked={performance === this.props.control.performance} onChange={this.props.onHandleChange} value={performance} />&nbsp; {performance}
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
                                    <button type="submit" className={`button is-dark ${this.props.loading && 'is-loading'}`} disabled={this.props.disabledSubmitButton}>
                                        <span className="icon"><i className="fas fa-check" /></span>
                                        <span>Confirmar</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}