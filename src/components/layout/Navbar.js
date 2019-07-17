import React from 'react';
import {Link} from "react-router-dom";
import LoginButton from "../authentication/LoginButton";
import {isNotNullOrUndefined} from "../../utils/Utils";
import LoggedUserMenu from "../menu/LoggedUserMenu";
import {Routes} from "../../utils/Constants";

const CLASS_LIST_TOKEN = "is-active";

const handleClickMenuButton = (event) => {
    const targetButton = event.target;
    const targetMenu = document.getElementById(targetButton.getAttribute("data-target"));

    targetButton.classList.toggle(CLASS_LIST_TOKEN);

    if (isNotNullOrUndefined(targetMenu))
        targetMenu.classList.toggle(CLASS_LIST_TOKEN);
};

export default function Navbar() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <Link className="navbar-item navbar-item-logo" to={Routes.BASE}>
                        <span className="is-size-3 has-text-weight-bold">higo</span>
                    </Link>

                    <a href="#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="higo-navbar-menu" onClick={handleClickMenuButton}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="higo-navbar-menu" className="navbar-menu">
                    <div className="navbar-end">
                        <LoggedUserMenu/>

                        <div className="navbar-item">
                            <div className="buttons">
                                <LoginButton/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}