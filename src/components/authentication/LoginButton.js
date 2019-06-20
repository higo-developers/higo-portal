import React from 'react';
import { withRouter } from "react-router-dom";
import { isAuthenticated } from "../../utils/AuthenticationUtils";

const LoginButton = withRouter(({history}) => (
    !isAuthenticated() && (
        <button className="button is-dark" onClick={() => { history.push("/login") }}>
            Ingresar
        </button>
    )
));

export default LoginButton;