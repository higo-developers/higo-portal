import React from 'react';
import FacebookLogin from 'react-facebook-login';
import UserResource from "../../resources/UserResource";
import {isNotNullOrUndefined} from "../../utils/Utils";

const fields = [
    "id",
    "first_name",
    "last_name",
    "middle_name",
    "email",
    "picture",
    "location",
    "hometown"
];

const fieldsSeparator = ",";

export default class FacebookLoginButton extends React.Component {
    constructor(props) {
        super(props);

        this.facebookCallback = this.facebookCallback.bind(this);
    }

    facebookCallback = async (fbResponse) => {
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

    render() {
        return (
            <React.Fragment>
                <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                    fields={fields.join(fieldsSeparator)}
                    callback={this.facebookCallback}
                    cssClass="button is-link is-fullwidth is-medium"
                    textButton="&nbsp; Ingresar con Facebook"
                    icon="fab fa-facebook-square"
                />
            </React.Fragment>
        );
    }
}