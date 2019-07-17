import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import {isNullOrUndefined} from "../../utils/Utils";
import {encodePreparedSearchParams} from "../../utils/VehicleSearchUtils";
import LocationAutocomplete from "../location/LocationAutocomplete";

export default class VehicleSearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.minDesde = new Date();

        this.state = {
            fechaDesde: undefined,
            fechaHasta: undefined,
            locacion: undefined,
            addMapsScript: false
        }
    }

    componentDidMount() {
        this.setState({ addMapsScript: true });
    }

    componentWillUnmount() {
        this.setState({ addMapsScript: false });
    }

    handleFechaDesde = (fechaDesde) => {
        this.setState({ fechaDesde: fechaDesde });

        if (!fechaDesde)
            this.setState({ fechaHasta: undefined });
    };

    handleFechaHasta = (fechaHasta) => {
        this.setState({ fechaHasta: fechaHasta });
    };

    getMinHasta = () => {
        return (this.state.fechaDesde) ? new Date(this.state.fechaDesde.getTime()) : new Date(this.minDesde.getTime());
    };

    getMaxHasta = () => {
        let maxHasta = this.getMinHasta();
        maxHasta.setDate(maxHasta.getDate() + parseInt(process.env.REACT_APP_MAX_DAYS_TO_RESERVE));
        return maxHasta;
    };

    searchButtonIsDisabled = () => {
        let invalidFechaDesde = isNullOrUndefined(this.state.fechaDesde);
        let invalidFechaHasta = isNullOrUndefined(this.state.fechaHasta);
        let invalidLocation = isNullOrUndefined(this.state.locacion);

        return invalidFechaDesde || invalidFechaHasta || invalidLocation;
    };

    onChangeQuery = (locationData) => {
        this.setState({locacion: locationData});
    };

    handleClick = (event) => {
        event.preventDefault();
        this.props.onSearch(encodePreparedSearchParams(this.state));
    };

    render() {
        return (
            <React.Fragment>
                <form>
                    <div className="columns is-multiline">
                        <div className="column is-6">
                            <div className="field">
                                <label className="label">Fecha desde <span className="has-text-grey-light">*</span></label>
                                <div className="control">
                                    <DateTimePicker name="fechaDesde" className="input" onChange={this.handleFechaDesde} minDate={this.minDesde} value={this.state.fechaDesde} />
                                </div>
                            </div>
                        </div>

                        <div className="column is-6">
                            <div className="field">
                                <label className="label">Fecha hasta <span className="has-text-grey-light">*</span></label>
                                <div className="control">
                                    <DateTimePicker name="fechaHasta" className="input" disabled={isNullOrUndefined(this.state.fechaDesde)} onChange={this.handleFechaHasta} minDate={this.getMinHasta()} maxDate={this.getMaxHasta()} value={this.state.fechaHasta} />
                                </div>
                            </div>
                        </div>

                        <div className="column is-12">
                            <div className="field">
                                <label className="label">Ubicaci&oacute;n <span className="has-text-grey-light">*</span></label>
                                <div className="control">
                                    <LocationAutocomplete onChangeQuery={this.onChangeQuery}/>
                                </div>
                            </div>
                        </div>

                        <div className="column is-6 is-offset-3">
                            <div className="field">
                                <div className="control">
                                    <button name="Confirm" type="button" className="button is-dark is-fullwidth is-medium" disabled={this.searchButtonIsDisabled()} onClick={this.handleClick}>
                                        <span className="icon"><i className="fas fa-search"/></span>
                                        <span>Buscar</span>
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