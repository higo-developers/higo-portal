import React from 'react';
import LoginResource from "../resources/LoginResource";
import { isNotNullOrUndefined } from "../utils/Utils";

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

    handleClick = async (event) => {
        event.preventDefault();

        this.setState({loading: true, error: undefined});

        try {
            let response = await LoginResource.doLogin(this.state.formData);

            if (isNotNullOrUndefined(response.errorMessage)) throw new Error(response.errorMessage);

            this.setState({ loading: false, error: undefined });

            console.log(response);
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
                                                    <input className="input" type="email" name="email" placeholder="E-Mail" onChange={this.handleChange} value={this.state.formData.email} />
                                                </div>
                                            </div>

                                            <div className="field">
                                                <label className="label">Password</label>
                                                <div className="control">
                                                    <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.formData.password} />
                                                </div>
                                            </div>

                                            {
                                                this.state.error && (
                                                    <article className="message is-danger">
                                                        <div className="message-body">{ this.state.error.message }</div>
                                                    </article>
                                                )
                                            }

                                            <div className="field">
                                                <div className="control">
                                                    <button className={`button is-dark is-fullwidth is-medium ${this.state.loading && 'is-loading'}`} onClick={this.handleClick} disabled={this.invalidForm()} >Confirmar</button>
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