import React from 'react';
import VehicleSearchMap from "../components/vehicle/VehicleSearchMap";
import VehicleResource from "../resources/VehicleResource";
import {Link} from "react-router-dom";
import {toPreparedSearchParams} from "../utils/VehicleSearchUtils";
import DateTimePicker from 'react-datetime-picker';
import {isNotNullOrUndefined} from "../utils/Utils";

export default class VehicleSearchMapPage extends React.Component {
    constructor(props) {
        super(props);

        let minDate = new Date();
        let maxDate = new Date();
        maxDate.setDate(minDate.getDate() + parseInt(process.env.REACT_APP_MIN_DAYS_TO_RESERVE));

        this.state = {
            searchParams: {fechaDesde: minDate, fechaHasta: maxDate},
            disableSearchButton: true,
            mapData: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        const buttonHasChanged = (prevState.searchParams.fechaDesde !== this.state.searchParams.fechaDesde) || (prevState.searchParams.fechaHasta !== this.state.searchParams.fechaHasta);

        buttonHasChanged && this.setState({disableSearchButton: !buttonHasChanged});
    }

    handleFechaDesde = (fechaDesde) => {
        if (isNotNullOrUndefined(fechaDesde)) {
            const newHasta = new Date(fechaDesde.getTime());
            newHasta.setDate(newHasta.getDate() + parseInt(process.env.REACT_APP_MIN_DAYS_TO_RESERVE));

            const currentHasta = this.state.searchParams.fechaHasta;

            this.setState({
                searchParams: {
                    ...this.state.searchParams,
                    fechaDesde: fechaDesde,
                    fechaHasta: fechaDesde > currentHasta ? newHasta : currentHasta
                }
            });
        }
    };

    handleFechaHasta = (fechaHasta) =>{
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                fechaHasta: fechaHasta
            }
        });
    };

    getMinHasta = () => {
        return new Date(this.state.searchParams.fechaDesde.getTime());
    };

    getMaxHasta = () => {
        let maxHasta = this.getMinHasta();
        maxHasta.setDate(maxHasta.getDate() + parseInt(process.env.REACT_APP_MAX_DAYS_TO_RESERVE));
        return maxHasta;
    };

    fetchData = async () => {
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
                                                <DateTimePicker name="fechaDesde" className="input" onChange={this.handleFechaDesde} minDate={new Date()} value={this.state.searchParams.fechaDesde}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="column is-5">
                                        <div className="field">
                                            <label className="label">Fecha hasta <span className="has-text-grey-light">*</span></label>
                                            <div className="control">
                                                <DateTimePicker name="fechaHasta" className="input" onChange={this.handleFechaHasta} minDate={this.getMinHasta()} maxDate={this.getMaxHasta()} value={this.state.searchParams.fechaHasta}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="column">
                                        <div className="field">
                                            <div className="control">
                                                <label className="label">&nbsp;</label>
                                                <button name="Confirm" type="button" className="button is-dark is-fullwidth" disabled={this.state.disableSearchButton} onClick={this.fetchData}>
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
                                    dateTimes={toPreparedSearchParams(this.state.searchParams)}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}