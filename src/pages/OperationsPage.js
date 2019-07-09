import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import Operations from "../components/operation/Operations";

export default class OperationsPage extends React.Component {

    render() {
        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">Operaciones</h1>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <GoBackButton/>
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>

                <Operations title={"Como prestador"}/>

                <Operations title={"Como adquirente"}/>
            </React.Fragment>
        );
    }
}