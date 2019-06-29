import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {isAuthenticated} from "../../utils/AuthenticationUtils";
import {Routes} from "../../utils/Constants";

const ProtectedRoute = ({component: Component, ...rest}) => {
    return <Route
        {...rest}
        render={
            (props) => {
                if (isAuthenticated())
                    return <Component {...props} />
                else
                    return <Redirect to={ { pathname: Routes.LOGIN, state: { from: props.location } } } />;
            }
        }
    />;
};

export default ProtectedRoute;