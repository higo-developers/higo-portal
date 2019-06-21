import React from 'react';

export default function Tab(props) {

    const { name } = props.tab;
    const { activeTab, changeActiveTab } = props;

    return (
        <li className={name === activeTab ? "is-active" : ""} onClick={() => changeActiveTab(name)}>
            <a>
                <span>{name}</span>
            </a>
        </li>
    );

};