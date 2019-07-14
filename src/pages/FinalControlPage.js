import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import OperationSummary from "../components/operation/control/OperationSummary";
import OperationResource from "../resources/OperationResource";
import {handlePossibleErrorResponse} from "../utils/Utils";
import InitialControlSummary from "../components/operation/control/InitialControlSummary";

export default class FinalControlPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            disabledSubmitButton: false,
            operation: this.props.history.location.state.operationResponse,
            modalIsOpen: false,
            modalContent: null,
            previousControl: {}
        };

        this.getOperationControl = this.getOperationControl.bind(this);
    }

    componentDidMount() {
        console.log(`Buscar control inicial de operacion ${this.state.operation.idOperacion}`);

        this.getOperationControl();
    }

    getOperationControl = async () => {
        try {
            const response = await OperationResource.getOperationInitialControl(this.state.operation.idOperacion);

            handlePossibleErrorResponse(response);

            this.setState({previousControl: response});

            console.log(this.state.previousControl);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">Control final de operaci&oacute;n {this.state.operation.idOperacion}</h1>
                            </div>

                            <div className="level-right">
                                <div className="level-item">
                                    <GoBackButton />
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="section padding-bottom-0">
                    <div className="container">
                        <OperationSummary operation={this.state.operation} />
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <InitialControlSummary control={this.state.previousControl}/>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}