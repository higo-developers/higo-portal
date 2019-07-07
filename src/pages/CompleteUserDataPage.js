import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import LocationAutocomplete from "../components/location/LocationAutocomplete";
import UserResource from "../resources/UserResource";
import LoginResource from "../resources/LoginResource";
import {isNotNullOrUndefined} from "../utils/Utils";
import {login} from "../utils/AuthenticationUtils";
import {Routes} from "../utils/Constants";

export default class CompleteUserDataPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: null,
            userData: this.props.history.location.state
        };

        this._isMounted = false;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeQuery = this.onChangeQuery.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitButtonIsDisabled = this.submitButtonIsDisabled.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onChangeQuery = (locationData) => {
        this.setState({
            userData: {
                ...this.state.userData,
                locacion: locationData
            }
        });
    };

    handleChange = (event) => {
        const target = event.target;

        const name = target.name;
        const value = target.value;

        this.setState({
            userData: {
                ...this.state.userData,
                [name]: value
            }
        });
    };

    submitButtonIsDisabled = () => {
        return !this.state.userData.dni || !this.state.userData.telefono || !this.state.userData.locacion;
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, error: null});

        try {
            const response = await UserResource.saveUserFromFacebook(this.state.userData);
            this._isMounted && this.doLogin({email: response.email, password: response.password});
        } catch (error) {
            this.setState({loading: false, error: error});
        }
    };

    doLogin = async (loginRequest) => {
        try {
            let response = await LoginResource.doLogin(loginRequest);

            if (isNotNullOrUndefined(response.errorMessage)) throw new Error(response.errorMessage);

            login(response, () => { this.props.history.push(Routes.BASE) });

            this._isMounted && this.setState({loading: false, error: undefined});
        } catch (e) {
            this.setState({loading: false, error: e});
        }
    };

    render() {
        return (
            <React.Fragment>
                <section className="hero is-light is-fullheight-with-navbar">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-three-quarters">
                                    <div className="box padding-2">

                                        <div className="columns is-multiline">
                                            <div className="column is-fullwidth">
                                                <nav className="level is-mobile">
                                                    <div className="level-left is-hidden-mobile">
                                                        <h1 className="title">Completar datos de usuario</h1>
                                                    </div>
                                                    <div className="level-right">
                                                        <div className="level-item">
                                                            <GoBackButton/>
                                                        </div>
                                                    </div>
                                                </nav>
                                            </div>
                                        </div>

                                        <form onSubmit={this.handleSubmit}>
                                            <div className="columns is-multiline">
                                                <div className="column is-half">
                                                    <div className="control">
                                                        <input className="input" type="text" name="nombre" placeholder="Nombre" onChange={this.handleChange} value={this.state.userData.nombre} disabled/>
                                                    </div>
                                                </div>
                                                <div className="column is-half">
                                                    <div className="control">
                                                        <input className="input" type="text" name="apellido" placeholder="Apellido" onChange={this.handleChange} value={this.state.userData.apellido} disabled/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="columns is-multiline">
                                                <div className="column is-fullwidth">
                                                    <input className="input" type="email" name="email" placeholder="E-Mail" onChange={this.handleChange} value={this.state.userData.email} disabled/>
                                                </div>
                                            </div>

                                            <hr/>

                                            <div className="columns is-multiline">
                                                <div className="column is-half">
                                                    <div className="field">
                                                        <label className="label">Tel&eacute;fono <span className="has-text-grey-light">*</span></label>
                                                        <div className="control">
                                                            <input className="input" type="text" name="telefono" placeholder="Teléfono" onChange={this.handleChange} value={this.state.userData.telefono}/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="column is-half">
                                                    <div className="field">
                                                        <label className="label">DNI <span
                                                            className="has-text-grey-light">*</span></label>
                                                        <div className="control">
                                                            <input className="input" type="number" min={0} name="dni" placeholder="DNI" onChange={this.handleChange} value={this.state.userData.dni}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="columns is-multiline">
                                                <div className="column is-fullwidth">
                                                    <div className="field">
                                                        <label className="label">Ubicaci&oacute;n <span className="has-text-grey-light">*</span></label>
                                                        <div className="control">
                                                            <LocationAutocomplete onChangeQuery={this.onChangeQuery}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {this.state.error && (
                                                <article className="message is-danger">
                                                    <div className="message-body">{this.state.error.message}</div>
                                                </article>
                                            )}

                                            <div className="columns is-centered is-multiline">
                                                <div className="column is-three-quarters">
                                                    <div className="field">
                                                        <div className="control">
                                                            <button type="submit" className={`button is-dark is-fullwidth is-medium ${this.state.loading && 'is-loading'}`} disabled={this.submitButtonIsDisabled()}>
                                                                <span className="icon"><i className="fas fa-check"/></span>
                                                                <span>Confirmar</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}