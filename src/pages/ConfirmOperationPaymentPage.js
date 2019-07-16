import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import OperationPaymentSummary from "../components/operation/payment/OperationPaymentSummary";

export default class ConfirmOperationPaymentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            operation: this.props.history.location.state.operationResponse
        };
    }

    render() {
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

                <section className="section">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-two-thirds">
                                <OperationPaymentSummary operation={this.state.operation}/>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}