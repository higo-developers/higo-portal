import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {getLoggedUserName, isAuthenticated, logout} from "../../utils/AuthenticationUtils";
import {Routes} from "../../utils/Constants";

const LoggedUserMenu = withRouter(({history}) => (
    isAuthenticated() && (
        <React.Fragment>
            <Link className="navbar-item" to={Routes.OPERATIONS}>
                Operaciones
            </Link>

            <Link className="navbar-item" to={Routes.PROFILE_VEHICLES}>
                Veh&iacute;culos
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
                <a href={"#"} className="navbar-link">{getLoggedUserName()}</a>
                <div className="navbar-dropdown">
                    <Link className="navbar-item" to={"#"} onClick={() => logout(() => { history.push(Routes.BASE) })}>
                        <i className="fas fa-sign-out-alt"></i>&nbsp; Cerrar sesi&oacute;n
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
));

export default LoggedUserMenu;