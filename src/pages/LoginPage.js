import React from 'react';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: undefined,
            password: undefined
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <React.Fragment>
                <section className="hero is-light is-bold is-fullheight-with-navbar">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-half">
                                    <div className="box padding-2">
                                        <form>
                                            <div className="field">
                                                <label className="label">E-Mail</label>
                                                <div className="control">
                                                    <input className="input" type="email" name="email" placeholder="E-Mail" onChange={this.handleChange} value={this.state.email}/>
                                                </div>
                                            </div>

                                            <div className="field">
                                                <label className="label">Password</label>
                                                <div className="control">
                                                    <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                                                </div>
                                            </div>

                                            <div className="field">
                                                <div className="control">
                                                    <button
                                                        className="button is-dark is-fullwidth is-medium">Confirmar
                                                    </button>
                                                </div>
                                            </div>
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