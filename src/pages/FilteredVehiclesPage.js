import React from 'react';
import { decodeSearchParams, locationDataAsArray } from "../utils/VehicleSearchUtils";
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
        this.encodedSearch = new URLSearchParams(this.props.location.search).get(SEARCH_KEY);
        const search = decodeSearchParams(this.encodedSearch);

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
                {this.searchTags.length && (
                    <section className="section padding-bottom-0">
                        <div className="container">
                            <div className="tags are-medium">
                                {this.searchTags.map((tag) => {
                                    return (<span key={tag} className="tag"><i className="fas fa-map-marked-alt"></i>&nbsp; {tag}</span>)
                                })}
                            </div>
                        </div>
                    </section>
                )}

                <section className="section">
                    <div className="container">
                        {
                            this.state.data.length  ? (<VehicleThumbnailList vehicles={this.state.data} /> )
                                                    : ( <p className="title">No se encontraron resultados</p> )
                        }
                    </div>
                </section>
            </React.Fragment>
        );
    }
}