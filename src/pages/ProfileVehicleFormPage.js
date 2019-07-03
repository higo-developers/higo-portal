import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import ProfileResource from "../resources/ProfileResource";
import {ProfileVehicle} from "../models/DTO";
import BrandResource from "../resources/BrandResource";
import OptionsResource from "../resources/OptionsResource";
import {Routes} from "../utils/Constants";
import {isNotNullOrUndefined} from "../utils/Utils";

const TITLE_EDIT_VEHICLE = "Editar vehículo";
const TITLE_NEW_VEHICLE = "Nuevo vehículo";

const INPUT_TYPE_CHECKBOX = 'checkbox';

export default class ProfileVehicleFormPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: null,
            title: "",
            vehicle: null,
            brands: [],
            models: [],
            fuels: [],
            cilindradas: []
        };

        this.fetchVehicleData = this.fetchVehicleData.bind(this);
        this.loadBrands = this.loadBrands.bind(this);
        this.loadModels = this.loadModels.bind(this);
        this.loadFuels = this.loadFuels.bind(this);
        this.loadCilindradas = this.loadCilindradas.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBrandChange = this.handleBrandChange.bind(this);
    }

    componentDidMount() {
        let title;

        if (this.props.match.params.id) {
            title = TITLE_EDIT_VEHICLE;
            this.fetchVehicleData(this.props.match.params.id);
        } else {
            title = TITLE_NEW_VEHICLE;
            this.setState({vehicle: new ProfileVehicle()});
        }

        this.loadFuels();
        this.loadCilindradas();
        this.loadBrands();

        this.setState({
            title: title
        });
    }

    loadBrands = async () => {
        try {
            const brands = await BrandResource.getAll();

            brands.length > 0 && this.loadModels(brands[0].id);

            this.setState({brands: brands});
        } catch (error) {
            console.log(error);
        }
    };

    loadCilindradas = async () => {
        try {
            const cilindradas = await OptionsResource.getCCs();
            this.setState({cilindradas: cilindradas});
        } catch (error) {
            console.log(error)
        }
    };

    loadFuels = async () => {
        try {
            const fuels = await OptionsResource.getFuels();
            this.setState({fuels: fuels});
        } catch (error) {
            console.log(error)
        }
    };

    loadModels = async (brandId) => {
        try {
            const models = await BrandResource.getModelsByBrand(brandId);
            this.setState({models: models});
        } catch (error) {
            console.log(error)
        }
    };

    fetchVehicleData = async (vehicleId) => {
        const vehicle = await ProfileResource.getUserVehicleById(vehicleId);
        this.setState({vehicle: vehicle});
        this.loadModels(vehicle.marca);
    };

    handleBrandChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.loadModels(value);

        this.setState({
            vehicle: {
                ...this.state.vehicle,
                [name]: value,
                modelo: this.state.models.length > 0 ? this.state.models[0].id : ""
            }
        });
    };

    handleChange = (event) => {
        const target = event.target;

        const value = target.type === INPUT_TYPE_CHECKBOX ? target.checked : target.value;
        const name = target.name;

        this.setState({
            vehicle: {
                ...this.state.vehicle,
                [name]: value
            }
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true, error: null});

        try {
            const response = await ProfileResource.saveVehicle(this.state.vehicle);

            if (isNotNullOrUndefined(response.errorMessage)) throw new Error(response.errorMessage);

            this.props.history.push(Routes.PROFILE_VEHICLES);
        } catch (error) {
            this.setState({loading: false, error: error});
        }
    };

    render() {
        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">{this.state.title}</h1>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <GoBackButton/>
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>

                {this.state.vehicle && (
                    <section className="section">
                        <div className="container">
                            <div className="container">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="columns is-multiline">
                                        <div className="column is-full">
                                            <p className="subtitle">Informaci&oacute;n general</p>
                                        </div>

                                        <div className="column is-one-qarter">
                                            <div className="field">
                                                <label className="label">Marca</label>
                                                <div className="control">
                                                    <div className="select is-fullwidth">
                                                        <select name="marca" disabled={this.state.brands.length < 1} value={this.state.vehicle.marca} onChange={this.handleBrandChange}>
                                                            {this.state.brands.length > 0 && this.state.brands.map((brand) => {
                                                                return (
                                                                    <option key={brand.id}
                                                                            value={brand.id}>{brand.descripcion}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column is-one-qarter">
                                            <div className="field">
                                                <label className="label">Modelo</label>
                                                <div className="control">
                                                    <div className="select is-fullwidth">
                                                        <select name="modelo" disabled={this.state.models.length < 1} value={this.state.vehicle.modelo} onChange={this.handleChange}>
                                                            <option>Seleccione un modelo</option>
                                                            {this.state.models.length > 0 && this.state.models.map((model) => {
                                                                return (
                                                                    <option key={model.id}
                                                                            value={model.id}>{model.descripcion}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column is-one-qarter">
                                            <div className="field">
                                                <label className="label">A&ntilde;o</label>
                                                <div className="control">
                                                    <input name="anno" className="input" type="text" placeholder="Año" onChange={this.handleChange} value={this.state.vehicle.anno}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column is-one-qarter">
                                            <div className="field">
                                                <label className="label">Patente</label>
                                                <div className="control">
                                                    <input name="patente" className="input" type="text" placeholder="Patente" onChange={this.handleChange} value={this.state.vehicle.patente.toUpperCase()}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <br/>

                                    <div className="columns">
                                        <div className="column is-one-third">
                                            <div className="columns is-multiline">
                                                <div className="column is-full">
                                                    <p className="subtitle">Equipamiento</p>
                                                </div>

                                                <div className="column is-full">
                                                    <div className="field is-grouped-multiline">
                                                        <div className="control">
                                                            <label className="checkbox">
                                                                <input name="abs" type="checkbox" onChange={this.handleChange} checked={this.state.vehicle.abs} value={this.state.vehicle.abs}/> ABS
                                                            </label>
                                                        </div>

                                                        <div className="control">
                                                            <label className="checkbox">
                                                                <input name="ac" type="checkbox" onChange={this.handleChange} checked={this.state.vehicle.ac} value={this.state.vehicle.ac}/> Aire
                                                                acondicionado
                                                            </label>
                                                        </div>

                                                        <div className="control">
                                                            <label className="checkbox">
                                                                <input name="airbag" type="checkbox" onChange={this.handleChange} checked={this.state.vehicle.airbag} value={this.state.vehicle.airbag}/> Airbag
                                                            </label>
                                                        </div>

                                                        <div className="control">
                                                            <label className="checkbox">
                                                                <input name="alarma" type="checkbox" onChange={this.handleChange} checked={this.state.vehicle.alarma} value={this.state.vehicle.alarma}/> Alarma
                                                            </label>
                                                        </div>

                                                        <div className="control">
                                                            <label className="checkbox">
                                                                <input name="cierreCentralizado" type="checkbox" onChange={this.handleChange} checked={this.state.vehicle.cierreCentralizado} value={this.state.vehicle.cierreCentralizado}/> Cierre centralizado
                                                            </label>
                                                        </div>

                                                        <div className="control">
                                                            <label className="checkbox">
                                                                <input name="controlTraccion" type="checkbox" onChange={this.handleChange} checked={this.state.vehicle.controlTraccion} value={this.state.vehicle.controlTraccion}/> Control de tracción
                                                            </label>
                                                        </div>

                                                        <div className="control">
                                                            <label className="checkbox">
                                                                <input name="da" type="checkbox" onChange={this.handleChange} checked={this.state.vehicle.da} value={this.state.vehicle.da}/> Dirección asistida
                                                            </label>
                                                        </div>

                                                        <div className="control">
                                                            <label className="checkbox">
                                                                <input name="dh" type="checkbox" onChange={this.handleChange} checked={this.state.vehicle.dh} value={this.state.vehicle.dh}/> Dirección hidraulica
                                                            </label>
                                                        </div>

                                                        <div className="control">
                                                            <label className="checkbox">
                                                                <input name="rompenieblasDelantero" type="checkbox" onChange={this.handleChange} checked={this.state.vehicle.rompenieblasDelantero} value={this.state.vehicle.rompenieblasDelantero}/> Rompenieblas delantero
                                                            </label>
                                                        </div>

                                                        <div className="control">
                                                            <label className="checkbox">
                                                                <input name="rompenieblasTrasero" type="checkbox" onChange={this.handleChange} checked={this.state.vehicle.rompenieblasTrasero} value={this.state.vehicle.rompenieblasTrasero}/> Rompenieblas trasero
                                                            </label>
                                                        </div>

                                                        <div className="control">
                                                            <label className="checkbox">
                                                                <input name="tapizadoCuero" type="checkbox" onChange={this.handleChange} checked={this.state.vehicle.tapizadoCuero} value={this.state.vehicle.tapizadoCuero}/> Tapizado de cuero
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {this.state.cilindradas.length > 0 && (
                                            <div className="column is-one-third">
                                                <div className="columns is-multiline">
                                                    <div className="column is-full">
                                                        <p className="subtitle">Cilindrada</p>
                                                    </div>

                                                    <div className="column is-full">
                                                        <div className="field is-grouped-multiline">
                                                            {this.state.cilindradas.map((cc) => {
                                                                return (
                                                                    <div className="control" key={cc.id}>
                                                                        <label className="radio">
                                                                            <input type="radio" name="cilindrada"
                                                                                   checked={cc.id == this.state.vehicle.cilindrada}
                                                                                   onChange={this.handleChange}
                                                                                   value={cc.id}/>&nbsp; {cc.descripcion}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {this.state.fuels.length > 0 && (
                                            <div className="column is-one-third">
                                                <div className="columns is-multiline">
                                                    <div className="column is-full">
                                                        <p className="subtitle">Combustible</p>
                                                    </div>

                                                    <div className="column is-full">
                                                        <div className="field is-grouped-multiline">
                                                            {this.state.fuels.map((fuel) => {
                                                                return (
                                                                    <div className="control" key={fuel.codigo}>
                                                                        <label className="radio">
                                                                            <input type="radio" name="combustible" checked={fuel.codigo == this.state.vehicle.combustible} onChange={this.handleChange} value={fuel.codigo}/>&nbsp; {fuel.descripcion}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {this.state.error && (
                                        <div className="columns">
                                            <div className="column is-full">
                                                <article className="message is-danger">
                                                    <div className="message-body">{this.state.error.message}</div>
                                                </article>
                                            </div>
                                        </div>
                                    )}

                                    <div className="columns is-multiline">
                                        <div className="column is-full">
                                            <div className="field is-grouped">
                                                <div className="control">
                                                    <button type="submit" className={`button is-dark ${this.state.loading && 'is-loading'}`}>
                                                        <span className="icon"><i className="fas fa-check"/></span>
                                                        <span>Guardar</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                )}
            </React.Fragment>
        );
    }
}