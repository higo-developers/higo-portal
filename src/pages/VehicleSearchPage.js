import React from 'react';
import VehicleSearchForm from "../components/vehicle/VehicleSearchForm";
import {Link} from "react-router-dom";
import {Routes} from "../utils/Constants";

export default class VehicleSearchPage extends React.Component {

    handleSearch = (encodedSearch) => {
        this.props.history.push({
            pathname: Routes.VEHICLES,
            state: {encodedSearch}
        });
    };

    render() {
        return (
            <React.Fragment>
                <section className="hero is-fullheight-with-navbar higo-banner-bg">
                    <div className="hero-body">
                        <div className="container">
                            <div className="box padding-2">
                                <div className="level">
                                    <div className="level-left">
                                        <div>
                                            <p className="title">Busc&aacute; un veh&iacute;culo</p>
                                            <p className="has-text-grey-light">* Campos obligatorios</p>
                                        </div>
                                    </div>
                                    <div className="level-right">
                                        <Link className="button is-light" to={Routes.SEARCH_BY_MAP}>
                                            <i className="fas fa-map-marked-alt"></i>&nbsp; Buscar en mapa
                                        </Link>
                                    </div>
                                </div>

                                <VehicleSearchForm onSearch={this.handleSearch}/>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}