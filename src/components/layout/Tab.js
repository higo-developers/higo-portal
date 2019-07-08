import React from 'react';
import {Link} from "react-router-dom";

export default function Tab(props) {
    const activeTab = props.tab.code === props.activeTab ? "is-active" : "";

    return (
        <React.Fragment>
            <li className={activeTab} onClick={() => props.changeActiveTab(props.tab.code)}>
                <Link to={`#${props.tab.code}`}>
                    <span>{props.tab.title}</span>
                </Link>
            </li>
        </React.Fragment>
    );
}