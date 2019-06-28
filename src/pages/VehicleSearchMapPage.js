import React from 'react';
import VehicleSearchMap from "../components/vehicle/VehicleSearchMap";
import VehicleResource from "../resources/VehicleResource";
import {Link} from "react-router-dom";
import {toPreparedSearchParams} from "../utils/VehicleSearchUtils";
import DateTimePicker from 'react-datetime-picker';

export default class VehicleSearchMapPage extends React.Component {
    constructor(props) {
        super(props);

        let minDate = new Date();
        let maxDate = new Date();
        maxDate.setDate(minDate.getDate() + parseInt(process.env.REACT_APP_MIN_DAYS_TO_RESERVE));

        this.state = {
            searchParams: {
                fechaDesde: minDate,
                fechaHasta: maxDate
            },
            mapData: []
        }
    }

    componentDidMount() {
        this.getDataForMap();
    }

    getDataForMap = async () => {
        try {
            const data = await VehicleResource.getByParams(toPreparedSearchParams(this.state.searchParams));
            this.setState({ mapData: data });
        } catch (error) {
            console.log(error);
        }
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
                                        <p className="title">Veh&iacute;culos cercanos</p>
                                    </div>
                                    <div className="level-right">
                                        <Link className="button is-light" to="/search">
                                            <i className="fas fa-filter"></i>&nbsp; Filtrar b&uacute;squeda
                                        </Link>
                                    </div>
                                </div>

                                <div className="columns">
                                    <div className="column is-5">
                                        <div className="field">
                                            <label className="label">Fecha desde <span className="has-text-grey-light">*</span></label>
                                            <div className="control">
                                                <DateTimePicker name="fechaDesde" className="input" minDate={this.state.searchParams.fechaDesde} value={this.state.searchParams.fechaDesde} onChange={() =>{}}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="column is-5">
                                        <div className="field">
                                            <label className="label">Fecha hasta <span className="has-text-grey-light">*</span></label>
                                            <div className="control">
                                                <DateTimePicker name="fechaHasta" className="input" minDate={this.state.searchParams.fechaDesde} value={this.state.searchParams.fechaHasta} onChange={() =>{}}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="column">
                                        <div className="field">
                                            <div className="control">
                                                <label className="label">&nbsp;</label>
                                                <button name="Confirm" type="button" className="button is-dark is-fullwidth" onClick={() => {}}>
                                                    <span className="icon"><i className="fas fa-search"/></span>
                                                    <span>Buscar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <VehicleSearchMap
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                                    loadingElement={<div style={{height: `100%`}}/>}
                                    containerElement={<div style={{height: `70vh`}}/>}
                                    mapElement={<div style={{height: `100%`}}/>}
                                    mapData={this.state.mapData}
                                    dateTimes={this.state.searchParams}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}