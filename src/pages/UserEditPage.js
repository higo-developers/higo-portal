import React from 'react';
import UserForm from "../components/user/UserForm";

export default class UserEdit extends React.Component {
    handleUser = (user) => {
        console.log(user);
    }
    render() {
        return (
            <React.Fragment>
                <section className="hero is-light is-bold is-fullheight-with-navbar">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-half">
                                    <div className="box padding-3">
                                        <UserForm onUserSave = {this.handleUser}/>
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