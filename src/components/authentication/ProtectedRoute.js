import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../utils/AuthenticationUtils";

const ProtectedRoute = ({component: Component, ...rest}) => {
    return <Route
        {...rest}
        render={
            (props) => {
                if (isAuthenticated())
                    return <Component {...props} />
                else
                    return <Redirect to={ { pathname: '/login', state: { from: props.location } } } />;
            }
        }
    />;
};

export default ProtectedRoute;