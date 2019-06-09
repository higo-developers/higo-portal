import React from 'react';
import VehicleSearchForm from "../components/vehicle/VehicleSearchForm";

export default class VehicleSearchPage extends React.Component {

    handleSearch = (encodedSearch) => {
        this.props.history.push({
            pathname: "/vehicles",
            search: `search=${encodedSearch}`
        });
    };

    render() {
        return (
            <React.Fragment>
                <section className="hero is-medium higo-banner-bg">
                    <div className="hero-body">
                        <div className="container">
                            <div className="box padding-2">
                                <div className="level">
                                    <div className="level-left">
                                        <p className="title">Busc&aacute; un veh&iacute;culo</p>
                                    </div>
                                    <div className="level-right">
                                        <p className="has-text-grey-light">* Campos obligatorios</p>
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