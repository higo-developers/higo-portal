import React from 'react';
import LoginResource from "../resources/LoginResource";

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
        this.setState({
            formData: {
                ...this.state.formData,
                [event.target.name]: event.target.value
            }
        });
    };

    handleClick = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, error: undefined });

        try {
            const response = await LoginResource.doLogin(this.state.formData);
            console.log(response);
        } catch (error) {
            console.log(error);
            this.setState({ loading: false, error: error });
        }
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
                                                    { !this.state.formData.email && (<p className="help is-danger">Campo requerido</p>) }
                                                </div>
                                            </div>

                                            <div className="field">
                                                <label className="label">Password</label>
                                                <div className="control">
                                                    <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.formData.password} />
                                                    { !this.state.formData.password && (<p className="help is-danger">Campo requerido</p>) }
                                                </div>
                                            </div>

                                            {
                                                this.state.error && (
                                                    <article className="message is-danger">
                                                        <div className="message-body">Ha ocurrido un error. Intente m&aacute;s tarde.</div>
                                                    </article>
                                                )
                                            }

                                            <div className="field">
                                                <div className="control">
                                                    <button className={`button is-dark is-fullwidth is-medium ${this.state.loading && 'is-loading'}`} onClick={this.handleClick}>Confirmar</button>
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