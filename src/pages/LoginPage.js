import React from 'react';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <form>
                        <div className="field">
                            <label className="label">Name</label>
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
                                <button className="button is-dark is-fullwidth">Confirmar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}