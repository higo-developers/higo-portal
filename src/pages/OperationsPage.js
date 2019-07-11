import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import Operations from "../components/operation/Operations";
import Loading from "../components/layout/Loading";
import Error from "../components/layout/Error";
import {OperationRoles} from "../utils/Constants";
import UserResource from "../resources/UserResource";

export default class OperationsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: null,
            data: {}
        };

        this.fetchData = this.fetchData.bind(this);
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

    render() {

        if (this.state.loading)
            return <Loading/>;

        if (this.state.error)
            return <Error/>;

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

                {this.state.data.prestador && (
                    <Operations role={OperationRoles.PROVIDER} title={"Como prestador"} data={this.state.data.prestador}/>
                )}

                {this.state.data.adquirente && (
                    <Operations role={OperationRoles.ACQUIRER} title={"Como adquirente"} data={this.state.data.adquirente}/>
                )}
            </React.Fragment>
        );
    }
}