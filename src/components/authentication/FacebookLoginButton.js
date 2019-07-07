import React from 'react';
import FacebookLogin from 'react-facebook-login';

const fields = ["id", "first_name", "last_name", "middle_name", "email", "picture"];
const fieldsSeparator = ",";

export default class FacebookLoginButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            userId: "",
            name: "",
            email: "",
            avatar: ""
        };

        this.responseFacebook = this.responseFacebook.bind(this);
    }

    responseFacebook = (response) => {
        console.log(response);
    };

    render() {
        return (
            <React.Fragment>
                {this.state.isLoggedIn && (
                    <FacebookLogin
                        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                        fields={fields.join(fieldsSeparator)}
                        callback={this.responseFacebook}
                        cssClass="button is-link is-fullwidth is-medium"
                        textButton="&nbsp; Ingresar con Facebook"
                        icon="fab fa-facebook-square"
                    />
                )}
            </React.Fragment>
        );
    }
}