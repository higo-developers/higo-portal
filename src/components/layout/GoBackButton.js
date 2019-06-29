import React from 'react';
import {withRouter} from "react-router-dom";

const GoBackButton = withRouter(
    ({history}) => {
        return <button onClick={() => history.goBack()} className="button is-dark">
            <i className="fas fa-arrow-left"></i>&nbsp; Volver
        </button>
    }
);

export default GoBackButton;
