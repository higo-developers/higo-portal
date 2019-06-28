import React from 'react';

// const  ESTADO_OPERACION_PENDIENTE= "3";

export default class ReservePage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="modal is-active">
                    <div className="modal-background"></div>

                    <div className="modal-content">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">
                                    Pagina de reserva
                                </p>
                            </header>
                            <div className="card-content">
                                <div className="content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis
                                    mauris.
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="modal-close is-large" aria-label="close" onClick={() => this.props.history.goBack()}></button>
                </div>
            </React.Fragment>
        )
    }
}