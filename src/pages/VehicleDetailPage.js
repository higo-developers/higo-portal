import React from 'react';

export default class VehicleDetailPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicleId: this.props.match.params.id,
            loading: true,
            error: null,
            data: {}
        };
    }

    render() {
        return (
            <React.Fragment>
                <section className="section">
                    <div className="container">
                        <nav className="level">
                            <div className="level-left">
                                <p>Detalle del vehiculo { this.state.vehicleId }</p>
                            </div>
                            <div className="level-right">
                                <button onClick={() => { this.props.history.goBack() }} className="button is-dark"><i className="fas fa-arrow-left"></i>&nbsp; Volver</button>
                            </div>
                        </nav>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}