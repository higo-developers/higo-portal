/* global google */

import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import Script from 'react-load-script';
import { isNullOrUndefined } from "../../utils/Utils";

const API_KEY = "AIzaSyC4ge6wVwBew3G-SovR6E0tvOlsmgcFKqQ";
const MAXIMUM_DAYS_TO_RESERVE = 30;

export default class VehicleSearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.minDesde = new Date();

        this.state = {
            fechaDesde: undefined,
            fechaHasta: undefined,
            location: undefined
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
        return (this.state.fechaDesde) ? new Date(this.state.fechaDesde.getTime()) : new Date(this.minDesde.getTime());
    };

    getMaxHasta = () => {
        let maxHasta = this.getMinHasta();
        maxHasta.setDate(maxHasta.getDate() + MAXIMUM_DAYS_TO_RESERVE);
        return maxHasta;
    };

    disableFechaHasta = () => {
        return this.state.fechaDesde === null || this.state.fechaDesde === undefined;
    };

    handleClick = () => {
      console.log(this.state);
    };

    searchButtonIsDisabled = () => {
        let invalidFechaDesde = isNullOrUndefined(this.state.fechaDesde);
        let invalidFechaHasta = isNullOrUndefined(this.state.fechaHasta);
        let invalidLocation = isNullOrUndefined(this.state.location);

        return invalidFechaDesde || invalidFechaHasta || invalidLocation;
    };

    initializeAutocomplete = () => {
        let options = { types: ["geocode"] };

        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("query"),
            options,
        );

        this.autocomplete.setFields(["address_components"]);
        this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
    };

    handlePlaceSelect = () => {
        var place = this.autocomplete.getPlace();
        console.log(place);
        console.log(typeof place.address_components);

    };

    handleChangeQuery = (event) => {
        let query = event.target.value;

        if (!query)
            this.setState({ location: undefined });
    };

    render() {
        return (
            <React.Fragment>
                <Script
                    url={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`}
                    onLoad={this.initializeAutocomplete}
                />
                <form>
                    <div className="columns is-multiline">
                        <div className="column is-6">
                            <div className="field">
                                <label className="label">Fecha desde</label>
                                <div className="control">
                                    <DateTimePicker name="fechaDesde" className="input" onChange={this.handleFechaDesde} minDate={this.minDesde} value={this.state.fechaDesde} />
                                </div>
                            </div>
                        </div>

                        <div className="column is-6">
                            <div className="field">
                                <label className="label">Fecha hasta</label>
                                <div className="control">
                                    <DateTimePicker name="fechaHasta" className="input" disabled={this.disableFechaHasta()} onChange={this.handleFechaHasta} minDate={this.getMinHasta()} maxDate={this.getMaxHasta()} value={this.state.fechaHasta} />
                                </div>
                            </div>
                        </div>

                        <div className="column is-12">
                            <div className="field">
                                <label className="label">Localidad</label>
                                <div className="control">
                                    <input name="query" id="query" className="input" type="text" placeholder="Buscar por ciudad o localidad" onChange={this.handleChangeQuery} />
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