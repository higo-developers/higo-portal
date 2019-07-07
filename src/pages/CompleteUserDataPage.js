import React from 'react';

export default class CompleteUserDataPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: this.props.history.location.state
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <React.Fragment>
                <section className="hero is-light is-fullheight-with-navbar">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-half">
                                    <div className="box padding-2">
                                        <p>Pagina para completar datos de usuario</p>

                                        <form onSubmit={this.handleSubmit}>
                                            <p>{this.state.userData.nombre}</p>
                                            <p>{this.state.userData.apellido}</p>
                                            <p>{this.state.userData.email}</p>
                                            <p>{this.state.userData.password}</p>
                                            <p>{this.state.userData.telefono}</p>
                                            <p>{this.state.userData.dni}</p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}