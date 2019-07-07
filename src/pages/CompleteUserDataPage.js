import React from 'react';

export default class CompleteUserDataPage extends React.Component {
    render() {
        console.log(this.props.history.location.state);

        return (
            <React.Fragment>
                <div className="container">
                    Pagina para completar datos de usuario
                </div>
            </React.Fragment>
        );
    }
}