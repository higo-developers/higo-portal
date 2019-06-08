/* global google */

import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import Script from 'react-load-script';

export default class VehicleSearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            minDesde: new Date(),
            fechaDesde: undefined,
            fechaHasta: undefined,
            location: { query: '' }
        }
    }

    handleFechaDesde = (fechaDesde) => {
        this.setState({ fechaDesde: fechaDesde });

        if (!fechaDesde) this.setState({ fechaHasta: undefined });
    };

    handleFechaHasta = (fechaHasta) => {
        this.setState({ fechaHasta: fechaHasta });
    };

    getMinHasta = () => {
        return (this.state.fechaDesde) ? new Date(this.state.fechaDesde.getTime()) : new Date(this.state.minDesde.getTime());
    };

    getMaxHasta = () => {
        let maxHasta = this.getMinHasta();
        maxHasta.setDate(maxHasta.getDate() + 30);
        return maxHasta;
    };

    disableFechaHasta = () => {
        return this.state.fechaDesde === null || this.state.fechaDesde === undefined;
    };

    handleClick = () => {
      console.log(this.state);
    };

    searchButtonIsDisabled = () => {
        let invalidFechaDesde = this.state.fechaDesde === null || this.state.fechaDesde === undefined;
        let invalidFechaHasta = this.state.fechaHasta === null || this.state.fechaHasta === undefined;

        return invalidFechaDesde || invalidFechaHasta;
    };

    initializeAutocomplete = () => {
        let options = { types: ['geocode'] };

        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('query'),
            options,
        );

        this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    };

    handlePlaceSelect = () => {
        var place = this.autocomplete.getPlace();
        console.log(place);
    };

    render() {
        const API_KEY = `AIzaSyC4ge6wVwBew3G-SovR6E0tvOlsmgcFKqQ`;

        return (
            <React.Fragment>
                <Script
                    url={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`}
                    onLoad={this.initializeAutocomplete}
                />
                <form>
                    <div className="columns">
                        <div className="column is-one-quarter">
                            <div className="field">
                                <label className="label">Fecha desde</label>
                                <div className="control">
                                    <DateTimePicker name="fechaDesde" className="input" onChange={this.handleFechaDesde} minDate={this.state.minDesde} value={this.state.fechaDesde} />
                                </div>
                            </div>
                        </div>

                        <div className="column is-one-quarter">
                            <div className="field">
                                <label className="label">Fecha hasta</label>
                                <div className="control">
                                    <DateTimePicker name="fechaHasta" className="input" disabled={this.disableFechaHasta()} onChange={this.handleFechaHasta} minDate={this.getMinHasta()} maxDate={this.getMaxHasta()} value={this.state.fechaHasta} />
                                </div>
                            </div>
                        </div>

                        <div className="column is-one-quarter">
                            <div className="field">
                                <label className="label">Localidad</label>
                                <div className="control">
                                    <input name="query" id="query" className="input" type="text" placeholder="Buscar por ciudad o localidad"/>
                                </div>
                            </div>
                        </div>

                        <div className="column is-one-quarter">
                            <div className="field">
                                <label className="label is-hidden-mobile">&nbsp;</label>
                                <div className="control">
                                    <button name="Confirm" type="button" className="button is-dark is-fullwidth" disabled={this.searchButtonIsDisabled()} onClick={this.handleClick}>
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