import React from 'react';
import Error from "../components/layout/Error";
import Loading from "../components/layout/Loading";
import VehicleResource from "../resources/VehicleResource";
import { locationDataAsArray } from "../utils/VehicleSearchUtils";

import ThumbnailImage from "../components/layout/ThumbnailImage";

const LOCATION_DATA_SEPARATOR = " - ";

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

        const vehicle = this.state.data;

        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">&nbsp;</div>
                            <div className="level-right">
                                <button onClick={() => { this.props.history.goBack() }} className="button is-dark"><i className="fas fa-arrow-left"></i>&nbsp; Volver</button>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-half">
                                <ThumbnailImage src={vehicle.pathImagen} alt={`${vehicle.id} - ${vehicle.marca} - ${vehicle.modelo}`} />
                            </div>
                            <div className="column is-half">
                                <p className="title">{vehicle.marca} {vehicle.modelo}</p>

                                <p className="subtitle is-6 has-text-grey">
                                    <i className="fas fa-map-marker-alt"></i>&nbsp; { locationDataAsArray(vehicle.locacion).join(LOCATION_DATA_SEPARATOR) }
                                </p>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}