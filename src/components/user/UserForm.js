import React from 'react';
import UserRegisterResource from "../../resources/UserRegisterResource";
import { Routes} from "../../utils/Constants";
import { isNotNullOrUndefined } from "../../utils/Utils";

export default class UserForm extends React.Component {

    constructor(props) {
        super(props);

        this.minDesde = new Date();

        this.state = {
            loading: false,
            error: undefined,
            formData: {
                email: "",
                password: "",
                nombre:"",
                apellido:"",
                dni:"" ,
                telefono:""
            },
            validData:{
                passwordConfirm:""
            }
            
        };

        this._isMounted = false;
    }
    componentDidMount() {
        this._isMounted = true;
        console.log(this.props);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = (event) => {
        const {name, value} = event.target;
            
        if (event.target.name === "passwordConfirm") {
            this.setState({
                validData:{
                    ...this.state.validData,
                    [name]: value
                }
            });
            return
        }

        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        });
    };

    handleClick = async (event) => {
        event.preventDefault();
        this.props.onUserSave(this.state.formData);
        // this.setState({"loading": true, "error": undefined})

        // try {
        //     let response = await UserRegisterResource.createUser(this.state.formData);
        //     if (isNotNullOrUndefined(response.errorMessage)) throw new Error(response.errorMessage);
        //     this._isMounted && this.setState({"loading": false, "error": undefined});
        //     this.props.history.push(Routes.BASE);
        // } catch (e) {
        //     this.setState({"loading": false, "error": e});
        // }
    };

    invalidForm = () => {
        if (!this.state.formData.email || !this.state.formData.password || !this.state.formData.nombre || !this.state.formData.apellido) {
            return true;
        }
        if (this.state.formData.password !== this.state.validData.passwordConfirm) {
            return true
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                 <form>
                    <div className="field">
                        <label className="label">E-Mail</label>
                        <div className="control">
                            <input className="input" type="email" name="email"
                                    placeholder="E-Mail" onChange={this.handleChange}
                                    value={this.state.formData.email}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" name="password"
                                    placeholder="Password" onChange={this.handleChange}
                                    value={this.state.formData.password}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Confirma el password</label>
                        <div className="control">
                            <input className="input" type="password" name="passwordConfirm"
                                    placeholder="Password" onChange={this.handleChange}
                                    value={this.state.validData.passwordConfirm}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Nombre</label>
                        <div className="control">
                            <input className="input" type="text" name="nombre"
                                    placeholder="Nombre" onChange={this.handleChange}
                                    value={this.state.formData.nombre}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Apellido</label>
                        <div className="control">
                            <input className="input" type="text" name="apellido"
                                    placeholder="Apellido" onChange={this.handleChange}
                                    value={this.state.formData.apellido}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">DNI</label>
                        <div className="control">
                            <input className="input" type="text" name="dni"
                                    placeholder="DNI" onChange={this.handleChange}
                                    value={this.state.formData.dni}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Telefono</label>
                        <div className="control">
                            <input className="input" type="tel" name="telefono"
                                    placeholder="Telefono" onChange={this.handleChange}
                                    value={this.state.formData.telefono}/>
                        </div>
                    </div>

                    {
                        this.state.error && (
                            <article className="message is-danger">
                                <div className="message-body">{this.state.error.message}</div>
                            </article>
                        )
                    }

                    <div className="field">
                        <div className="control">
                            <button
                                className={`button is-dark is-fullwidth is-medium ${this.state.loading && 'is-loading'}`}
                                onClick={this.handleClick}
                                disabled={this.invalidForm()}>Registrarse
                            </button>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}