import React from 'react';
import {Link} from "react-router-dom";

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to="/">
                            <span className="is-size-3 has-text-weight-bold">higo</span>
                        </Link>

                        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="higo-navbar-menu">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="higo-navbar-menu" className="navbar-menu">
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <Link className="button is-dark" to="/">Registrarse</Link>
                                    <Link className="button is-light" to="/">Ingresar</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}