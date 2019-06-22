import React from 'react';
import { decodeSearchParams, locationDataAsArray } from "../utils/VehicleSearchUtils";
import VehicleResource from "../resources/VehicleResource";
import VehicleThumbnailList from "../components/vehicle/VehicleThumbnailList";
import Loading from "../components/layout/Loading";
import Error from "../components/layout/Error";

const SEARCH_KEY = "search";

export default class FilteredVehiclesPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fechaDesde: undefined,
            fechaHasta: undefined,
            loading: true,
            error: null,
            data: []
        }
    }

    componentDidMount() {
        this.encodedSearch = new URLSearchParams(this.props.location.search).get(SEARCH_KEY);
        const search = decodeSearchParams(this.encodedSearch);
        this.setState(
            {
                fechaDesde: search.fechaDesde,
                fechaHasta: search.fechaHasta
            }
        );
        this.searchTags = locationDataAsArray(search);

        this.fetchData(search);
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

                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level">
                            <div className="level-left">
                                <div className="tags are-medium">
                                    {
                                        this.searchTags.length && this.searchTags.map((tag) => {
                                            return ( <span key={tag} className="tag"><i className="fas fa-map-marker-alt"></i>&nbsp; {tag}</span> )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="level-right">
                                <button onClick={() => { this.props.history.goBack() }} className="button is-dark"><i className="fas fa-arrow-left"></i>&nbsp; Volver</button>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        {
                            this.state.data.length  ? ( <VehicleThumbnailList vehicles={this.state.data}  dateTimes={this.props.location.search} /> )
                                                    : ( <p className="title">No se encontraron resultados</p> )
                        }
                    </div>
                </section>
            </React.Fragment>
        );
    }
}