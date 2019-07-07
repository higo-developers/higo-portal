/* global google */

import React from 'react';
import Script from "react-load-script";
import {
    getAddressComponentTypeName,
    getAddressComponentValue,
    validAddressComponents,
    validAddressComponentType
} from "../../utils/LocationUtils";


const ADDRESS_COMPONENTS = "address_components";

export default class LocationAutocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locationData: undefined
        }
    }


    handleChangeQuery = (event) => {
        let query = event.target.value;

        if (!query)
            this.props.onChangeQuery(undefined);
    };

    initializeAutocomplete = () => {
        let queryInput = document.getElementById("query");
        let options = {types: ["geocode"]};
        let autocompleteFields = [ADDRESS_COMPONENTS];

        this.autocomplete = new google.maps.places.Autocomplete(queryInput, options);
        this.autocomplete.setFields(autocompleteFields);
        this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
    };

    handlePlaceSelect = () => {
        let place = this.autocomplete.getPlace();
        let addressComponents = place[ADDRESS_COMPONENTS];

        if (validAddressComponents(addressComponents)) {
            addressComponents.forEach((aComponent) => {
                this.addAddressComponent(aComponent)
            });
        }
    };

    addAddressComponent = (addressComponent) => {
        if (validAddressComponentType(addressComponent)) {
            this.setState({
                locationData: {
                    ...this.state.locationData,
                    [getAddressComponentTypeName(addressComponent)]: getAddressComponentValue(addressComponent)
                }
            });

            this.props.onChangeQuery(this.state.locationData);
        }
    };

    render() {
        const mapsScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;

        return (
            <React.Fragment>
                <Script url={mapsScriptUrl} onLoad={this.initializeAutocomplete}/>

                <input name="query" id="query" className="input" type="text" placeholder="Buscar por ciudad o localidad" onChange={this.handleChangeQuery}/>
            </React.Fragment>
        );
    }

}