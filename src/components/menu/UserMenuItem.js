import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {getLoggedUserName, isAuthenticated, logout} from "../../utils/AuthenticationUtils";

const UserMenuItem = withRouter(({history}) => (
    isAuthenticated() && (
        <div className="navbar-item has-dropdown is-hoverable">
            <a href="#" className="navbar-link">{getLoggedUserName()}</a>
            <div className="navbar-dropdown">
                <Link className="navbar-item" to={"/edit"}>
                    <i className="fas fa-user-edit"></i>&nbsp; Editar usuario
                </Link>

                <Link className="navbar-item" to={"#"} onClick={() => logout(() => {
                    history.push("/")
                })}>
                    <i className="fas fa-sign-out-alt"></i>&nbsp; Cerrar sesi&oacute;n
                </Link>
                
                
            </div>
        </div>
    )
));

export default UserMenuItem;