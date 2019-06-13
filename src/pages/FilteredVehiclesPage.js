import React from 'react';
import { decodeSearchParams } from "../utils/VehicleSearchUtils";
import VehicleResource from "../resources/VehicleResource";
import VehicleThumbnailList from "../components/vehicle/VehicleThumbnailList";
import Loading from "../components/commons/Loading";
import Error from "../components/commons/Error";

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
        this.fetchData(decodeSearchParams(encodedSearch));
    }

    fetchData = async (searchParams) => {
        try {
            const data = await VehicleResource.getByParams(searchParams);
            this.setState({loading: false, data: data});
        } catch (error) {
            this.setState({loading: false, error: error});
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
                        {
                            this.state.data.length  ? (<VehicleThumbnailList vehicles={this.state.data} /> )
                                                    : ( <p className="has-text-centered">No se encontraron resultados</p> )
                        }
                    </div>
                </section>
            </React.Fragment>
        );
    }
}