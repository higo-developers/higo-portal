import React from 'react';
import LoginResource from "../resources/LoginResource";
import {isNotNullOrUndefined} from "../utils/Utils";
import {login} from "../utils/AuthenticationUtils";
import FacebookLoginButton from "../components/authentication/FacebookLoginButton";
import UserResource from "../resources/UserResource";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: undefined,
            formData: {
                email: "",
                password: ""
            }
        };

        this._isMounted = false;

        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        });
    };

    handleFacebookLogin = async (fbResponse) => {
        console.log(fbResponse);

        try {
            const apiResponse = await UserResource.getByEmailFromFacebook(fbResponse.email);

            isNotNullOrUndefined(apiResponse.errorCode)
                ? console.log("Redirigir a pantalla para completar datos")
                : console.log("Hacer login");

        } catch (error) {
            console.log(error);
        }
    };

    handleClick = async (event) => {
        event.preventDefault();
        this.setState({loading: true, error: undefined});

        try {
            let response = await LoginResource.doLogin(this.state.formData);

            if (isNotNullOrUndefined(response.errorMessage)) throw new Error(response.errorMessage);

            login(response, () => { this.props.history.goBack() });

            this._isMounted && this.setState({loading: false, error: undefined});
        } catch (e) {
            this.setState({loading: false, error: e});
        }
    };

    invalidForm = () => {
        return !this.state.formData.email || !this.state.formData.password;
    };

    render() {
        return (
            <React.Fragment>
                <section className="hero is-light is-bold is-fullheight-with-navbar">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-half">
                                    <div className="box padding-2">
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
                                                        disabled={this.invalidForm()}>Confirmar
                                                    </button>

                                                    <br/>

                                                    <FacebookLoginButton handleLogin={this.handleFacebookLogin} />
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