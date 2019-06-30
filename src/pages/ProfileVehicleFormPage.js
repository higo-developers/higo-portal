import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import ProfileResource from "../resources/ProfileResource";

const TITLE_EDIT_VEHICLE = "Editar vehículo";
const TITLE_NEW_VEHICLE = "Nuevo vehículo";

const INPUT_TYPE_CHECKBOX = 'checkbox';

export default class ProfileVehicleFormPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            vehicle: null,
            brands: [],
            fuels: [],
            cilindradas: []
        }
    }

    componentDidMount() {
        let title;

        if (this.props.match.params.id) {
            title = TITLE_EDIT_VEHICLE;
            this.fetchVehicleData(this.props.match.params.id);
        } else {
            title = TITLE_NEW_VEHICLE;
        }

        this.setState({
            title: title
        });
    }

    fetchVehicleData = async (vehicleId) => {
        const vehicle = await ProfileResource.getUserVehicleById(vehicleId);
        this.setState({vehicle: vehicle});
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
                                <form>
                                    <div className="columns is-multiline">
                                        <div className="column is-full">
                                            <p className="subtitle">Informaci&oacute;n general</p>
                                        </div>

                                        <div className="column is-one-qarter">
                                            <div className="field">
                                                <label className="label">Marca</label>
                                                <div className="control">
                                                    <div className="select is-fullwidth">
                                                        <select>
                                                            <option>Marca</option>
                                                            <option>Marca 1</option>
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
                                                        <select>
                                                            <option>Modelo</option>
                                                            <option>Modelo 1</option>
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
                                                    <input className="input" type="text" placeholder="Patente" disabled={this.state.vehicle.patente} onChange={this.handleChange} value={this.state.vehicle.patente}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <br/>

                                    <div className="columns">
                                        <div className="column is-half">
                                            <div className="columns is-multiline">
                                                <div className="column is-full">
                                                    <p className="subtitle">Combustible</p>
                                                </div>

                                                <div className="column is-full">
                                                    <div className="field is-grouped is-grouped-multiline">
                                                        <div className="control">
                                                            <label className="radio">
                                                                <input type="radio" name="combustible"/>&nbsp; Diesel
                                                            </label>
                                                        </div>
                                                        <div className="control">
                                                            <label className="radio">
                                                                <input type="radio" name="combustible"/>&nbsp; Nafta
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="column is-half">
                                            <div className="columns is-multiline">
                                                <div className="column is-full">
                                                    <p className="subtitle">Cilindrada</p>
                                                </div>

                                                <div className="column is-full">
                                                    <div className="field is-grouped is-grouped-multiline">
                                                        <div className="control">
                                                            <label className="radio">
                                                                <input type="radio" name="cilindrada"/>&nbsp; 1.4
                                                            </label>
                                                        </div>
                                                        <div className="control">
                                                            <label className="radio">
                                                                <input type="radio" name="cilindrada"/>&nbsp; 1.6
                                                            </label>
                                                        </div>
                                                        <div className="control">
                                                            <label className="radio">
                                                                <input type="radio" name="cilindrada"/>&nbsp; 2.0
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <br/>

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
                                                        <input name="ac" type="checkbox" onChange={this.handleChange} checked={this.state.vehicle.ac} value={this.state.vehicle.ac}/> Aire acondicionado
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

                                    <br/>

                                    <div className="columns is-multiline">
                                        <div className="column is-full">
                                            <div className="field is-grouped">
                                                <div className="control">
                                                    <button className="button is-dark">
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