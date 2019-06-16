import React from 'react';
import Error from "../components/commons/Error";
import Loading from "../components/commons/Loading";
import VehicleResource from "../resources/VehicleResource";

export default class VehicleDetailPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicleId: this.props.match.params.id,
            loading: true,
            error: null,
            data: {}
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const data = await VehicleResource.getById(this.state.vehicleId);
            this.setState({ loading: false, data: data });
        } catch (error) {
            console.log(error);
            this.setState({ loading: false, error: error });
        }
    };

    render() {
        if (this.state.loading) {
            return <Loading />;
        }

        if (this.state.error) {
            return <Error />;
        }

        return (
            <React.Fragment>
                <section className="section">
                    <div className="container">
                        <nav className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <div>
                                        <p className="title">{this.state.data.marca} {this.state.data.modelo}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <button onClick={() => { this.props.history.goBack() }} className="button is-dark"><i className="fas fa-arrow-left"></i>&nbsp; Volver</button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}