import React from 'react';
import {withRouter} from "react-router-dom";
import {isAuthenticated} from "../../utils/AuthenticationUtils";
import {Routes} from "../../utils/Constants";

const AuthenticateButtons = withRouter(({history}) => (
    !isAuthenticated() && (
        <React.Fragment>
            <button className="button is-dark" onClick={() => { history.push("/register") }}>
                <i className="fas fa-user-plus"></i>&nbsp; Crear cuenta
            </button>
            <button className="button is-dark" onClick={() => { history.push(Routes.LOGIN) }}>
                <i className="fas fa-sign-in-alt"></i>&nbsp; Iniciar sesion
            </button>

        </React.Fragment>
    )
));

export default AuthenticateButtons;