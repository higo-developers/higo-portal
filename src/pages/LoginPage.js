import React from 'react';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <section className="hero is-fullheight-with-navbar has-background-light">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-half">
                                    <div className="box padding-2">
                                        <form>
                                            <div className="field">
                                                <label className="label">E-Mail</label>
                                                <div className="control">
                                                    <input className="input" type="email" name="email" placeholder="E-Mail"/>
                                                </div>
                                            </div>

                                            <div className="field">
                                                <label className="label">Password</label>
                                                <div className="control">
                                                    <input className="input" type="password" name="password" placeholder="Password"/>
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