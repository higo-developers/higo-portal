import React from 'react';
import { withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "../../utils/AuthenticationUtils";

const LogoutButton = withRouter(({history}) => (
    isAuthenticated() && (
        <button className="button is-dark" onClick={() => logout( () => { history.push("/") })}>
            Salir
        </button>
    )
));

export default LogoutButton;