import React from 'react';
import Navbar from "./Navbar";

export default class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar/>
                {this.props.children}
            </React.Fragment>
        );
    }
}
