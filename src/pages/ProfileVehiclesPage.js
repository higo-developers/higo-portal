import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import Loading from "../components/layout/Loading";
import Error from "../components/layout/Error";
import UserResource from "../resources/UserResource";

export default class ProfileVehiclesPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: null,
            data: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const data = await UserResource.getUserVehicles();
            this.setState({loading: false, data: data});
        } catch (error) {
            this.setState({loading: false, error: error});
        }
    };

    render() {
        if (this.state.loading)
            return <Loading/>;

        if (this.state.error)
            return <Error/>;

        const noResults = <p className="subtitle">No hay veh&iacute;culos cargados.</p>;

        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">Veh&iacute;culos</h1>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <GoBackButton/>
                                </div>
                                <div className="level-item">
                                    <button onClick={() => {}} className="button is-light">
                                        <i className="fas fa-plus"></i>&nbsp; Nuevo
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        {this.state.data.length ? "Hay data" : noResults}
                    </div>
                </section>
            </React.Fragment>
        );
    }
}