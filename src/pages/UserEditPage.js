import React from 'react';
import UserForm from "../components/user/UserForm";
import UserRegisterResource from "../resources/UserRegisterResource";
import {Routes} from "../utils/Constants";
import {handlePossibleErrorResponse} from "../utils/Utils";
import {logout} from "../utils/AuthenticationUtils";

export default class UserEdit extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: undefined,
        };
        this._isMounted = false;

    }
    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    handleUser = (user) => {
        this.userData = user;
        this.submitUser();
    }

    submitUser = async () => {
        try {
            let response = await UserRegisterResource.editUser(this.userData.formData);

            handlePossibleErrorResponse(response);
            this._isMounted && this.setState({"loading": false, "error": undefined});
            logout(() => {this.props.history.push(Routes.LOGIN)});
        } catch (e) {
            this.setState({"loading": false, "error": e});
        }
        
    }
    render() {
        let message = "";
        if (this.state.error) {
            message = this.state.error.message;
        }
        return (
            <React.Fragment>
                <section className="hero is-light is-bold is-fullheight-with-navbar">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-half">
                                    <div className="box padding-3">
                                        <UserForm onUserSave = {this.handleUser} actionForm = "Actualizar Usuario" message={message}/>
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