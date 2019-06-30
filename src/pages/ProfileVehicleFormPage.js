import React from 'react';

export default class ProfileVehicleFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.match.params.id ? "Es edicion" : "Es nuevo"
        };
    }

    render() {
        return (
            <div className="container">Formulario de Vehiculo: {this.state.data}</div>
        );
    }
}