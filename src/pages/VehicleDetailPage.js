import React from 'react';
import Error from "../components/commons/Error";
import Loading from "../components/commons/Loading";
import VehicleResource from "../resources/VehicleResource";
import { locationDataAsArray } from "../utils/VehicleSearchUtils";

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
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto asperiores cum delectus deleniti dignissimos dolore doloribus, esse ex facere ipsam ipsum laudantium neque nisi placeat quo recusandae sequi sunt tempore ut! Ab accusantium animi aut consequuntur iure quo, ullam.
                            </div>
                            <div className="column is-half">
                                <p className="title">{this.state.data.marca} {this.state.data.modelo}</p>
                                <span className="tag is-medium"><i className="fas fa-map-marker-alt"></i>&nbsp; { locationDataAsArray(this.state.data.locacion).join(LOCATION_DATA_SEPARATOR) }</span>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}