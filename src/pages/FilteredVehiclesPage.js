import React from 'react';
import { decodeSearchParams } from "../utils/VehicleSearchUtils";

const SEARCH_KEY = "search";

export default class FilteredVehiclesPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: null,
            data: []
        }
    }

    componentDidMount() {
        const encodedSearch = new URLSearchParams(this.props.location.search).get(SEARCH_KEY);

        try {
            console.log(decodeSearchParams(encodedSearch));

            this.setState({loading: false, data: []});
        } catch (error) {
            this.setState({loading: false, error: error});
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <React.Fragment>
                    <section className="hero is-large">
                        <div className="hero-body">
                            <div className="container has-text-centered">
                                <h1 className="title">Cargando</h1>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            );
        }

        if (this.state.error) {
            return (
                <React.Fragment>
                    <section className="hero is-large">
                        <div className="hero-body">
                            <div className="container has-text-centered">
                                <h1 className="title">Ha ocurrido un error</h1>
                                <h2 className="subtitle">Por favor, intente m&aacute;s tarde.</h2>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <h1 className="has-text-centered">Vehiculos filtrados</h1>
            </React.Fragment>
        );
    }
}