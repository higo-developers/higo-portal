import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import Operations from "../components/operation/Operations";
import Loading from "../components/layout/Loading";
import Error from "../components/layout/Error";
import {OperationRoles, OperationStates, Routes} from "../utils/Constants";
import UserResource from "../resources/UserResource";
import {isNullOrUndefined} from "../utils/Utils";

export default class OperationsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: null,
            data: {}
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleRedirectCases = this.handleRedirectCases.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await UserResource.getUserOperations();
            this.setState({loading: false, data: response})
        } catch (error) {
            this.setState({loading: false, error: error});
        }
    };

    handleRedirectCases = (operationResponse, operationStatusCode) => {
        operationStatusCode === OperationStates.CONTROL_INICIAL && this.props.history.push({
            pathname: `${Routes.OPERATIONS}/${operationResponse.idOperacion}/control/initial`,
            state: {operationResponse}
        });

        operationStatusCode === OperationStates.CONTROL_FINAL && this.props.history.push({
            pathname: `${Routes.OPERATIONS}/${operationResponse.idOperacion}/control/final`,
            state: {operationResponse}
        });

        operationStatusCode === OperationStates.CONFIRMACION_PAGO && this.props.history.push({
            pathname: `${Routes.OPERATIONS}/${operationResponse.idOperacion}/payment`,
            state: {operationResponse}
        });
    };

    render() {

        if (this.state.loading)
            return <Loading/>;

        if (this.state.error)
            return <Error/>;

        const emptyData = isNullOrUndefined(this.state.data.prestador) && isNullOrUndefined(this.state.data.adquirente);

        return (
            <React.Fragment>
                <section className={`section ${!emptyData && "padding-bottom-0"}`}>
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

                {emptyData && (
                    <div className="container">
                        <p className="subtitle">No hay operaciones para mostrar.</p>
                    </div>
                )}


                {this.state.data.prestador && (
                    <Operations role={OperationRoles.PROVIDER} title={"Como prestador"} data={this.state.data.prestador} onRedirectCases={this.handleRedirectCases}/>
                )}

                {this.state.data.adquirente && (
                    <Operations role={OperationRoles.ACQUIRER} title={"Como adquirente"} data={this.state.data.adquirente}/>
                )}
            </React.Fragment>
        );
    }
}