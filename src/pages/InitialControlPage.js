import React from 'react';

export default class InitialControlPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            operation: this.props.history.location.state
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    Pagina de control inicial
                </div>
            </React.Fragment>
        );
    }
}