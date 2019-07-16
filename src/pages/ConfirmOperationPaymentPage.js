import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";

export default class ConfirmOperationPaymentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            operation: this.props.history.location.state.operationResponse
        };
    }


    render() {
        console.log(this.state.operation);

        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">Operaci&oacute;n {this.state.operation.idOperacion}: Confirmaci&oacute;n de pago</h1>
                            </div>

                            <div className="level-right">
                                <div className="level-item">
                                    <GoBackButton />
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}