import React from 'react';
import UserForm from "../components/user/UserForm";
import UserRegisterResource from "../resources/UserRegisterResource";
import { Routes} from "../utils/Constants";
import { isNotNullOrUndefined } from "../utils/Utils";

export default class UserRegister extends React.Component {
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
        console.log(user);
        this.userData = user;
        this.submitUser();
        // this.toggleModal();
    }

    submitUser = async () => {
        try {
            let response = await UserRegisterResource.createUser(this.userData.formData);

            if (isNotNullOrUndefined(response.errorMessage)) throw new Error(response.errorMessage);
            this._isMounted && this.setState({"loading": false, "error": undefined});
            this.props.history.push(Routes.BASE);
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
                                        <UserForm onUserSave = {this.handleUser} actionForm = "Registrate" message={message}/>
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