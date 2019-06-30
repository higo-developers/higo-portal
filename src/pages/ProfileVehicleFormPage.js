import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import ProfileResource from "../resources/ProfileResource";

const TITLE_EDIT_VEHICLE = "Editar vehículo";
const TITLE_NEW_VEHICLE = "Nuevo vehículo";

export default class ProfileVehicleFormPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            vehicle: null
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
        console.log(vehicle);
        return null;
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
                                                <input className="input" type="text" placeholder="Año"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-one-qarter">
                                        <div className="field">
                                            <label className="label">Patente</label>
                                            <div className="control">
                                                <input className="input" type="text" placeholder="Patente"/>
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
                                        <div className="field is-grouped is-grouped-multiline">
                                            <div className="control">
                                                <label className="checkbox">
                                                    <input type="checkbox"/> Equipamiento 1
                                                </label>
                                            </div>
                                            <div className="control">
                                                <label className="checkbox">
                                                    <input type="checkbox"/> Equipamiento 2
                                                </label>
                                            </div>
                                            <div className="control">
                                                <label className="checkbox">
                                                    <input type="checkbox"/> Equipamiento 3
                                                </label>
                                            </div>
                                            <div className="control">
                                                <label className="checkbox">
                                                    <input type="checkbox"/> Equipamiento 4
                                                </label>
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
            </React.Fragment>
        );
    }
}