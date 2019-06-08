/* global google */

import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import Script from 'react-load-script';
import { isNullOrUndefined } from "../../utils/Utils";
import {
    getAddressComponentTypeName,
    getAddressComponentValue,
    validAddressComponents,
    validAddressComponentType
} from "../../utils/VehicleSearchFormUtils";

const ADDRESS_COMPONENTS = "address_components";
const API_KEY = "AIzaSyC4ge6wVwBew3G-SovR6E0tvOlsmgcFKqQ";
const MAXIMUM_DAYS_TO_RESERVE = 30;

export default class VehicleSearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.minDesde = new Date();

        this.state = { fechaDesde: undefined, fechaHasta: undefined, locacion: undefined }
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
        maxHasta.setDate(maxHasta.getDate() + MAXIMUM_DAYS_TO_RESERVE);
        return maxHasta;
    };

    handleClick = () => {
      console.log(this.state);
    };

    searchButtonIsDisabled = () => {
        let invalidFechaDesde = isNullOrUndefined(this.state.fechaDesde);
        let invalidFechaHasta = isNullOrUndefined(this.state.fechaHasta);
        let invalidLocation = isNullOrUndefined(this.state.locacion);

        return invalidFechaDesde || invalidFechaHasta || invalidLocation;
    };

    initializeAutocomplete = () => {
        let queryInput = document.getElementById("query");
        let options = { types: ["geocode"] };
        let autocompleteFields = [ ADDRESS_COMPONENTS ];

        this.autocomplete = new google.maps.places.Autocomplete(queryInput, options);
        this.autocomplete.setFields(autocompleteFields);
        this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
    };

    handlePlaceSelect = () => {
        let place = this.autocomplete.getPlace();
        let addressComponents = place[ADDRESS_COMPONENTS];

        if ( validAddressComponents(addressComponents) ) {
            addressComponents.forEach((component) => { this.addAddressComponent(component) });
        }
    };

    addAddressComponent = (component) => {
        if (validAddressComponentType(component)) {
            this.setState({
                locacion: {
                    ...this.state.locacion,
                    [getAddressComponentTypeName(component)]: getAddressComponentValue(component)
                }
            });
        }
    };

    handleChangeQuery = (event) => {
        let query = event.target.value;

        if (!query)
            this.setState({ locacion: undefined });
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
                                <label className="label">Localidad <span className="has-text-grey-light">*</span></label>
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