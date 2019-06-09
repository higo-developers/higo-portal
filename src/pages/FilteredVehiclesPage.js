import React from 'react';

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
    }

    render() {
        if (this.state.loading) {
            return <h1 className="has-text-centered">Cargando</h1>
        }

        if (this.state.error) {
            return <h1 className="has-text-centered">Error</h1>
        }

        return (
            <React.Fragment>
                <h1 className="has-text-centered">Vehiculos filtrados</h1>
            </React.Fragment>
        );
    }
}