import React from 'react';

export default class OnGoingOperationsGrid extends React.Component {
    render() {
        const hasData = this.props.data.length > 0;

        return (
            <React.Fragment>
                {hasData ? (
                    <table className="table is-striped is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>Dato X</th>
                                <th>Dato X</th>
                                <th>Dato X</th>
                                <th>Dato X</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>
                                    <div className="buttons">
                                        <button className="button is-dark">
                                            <span><i className="fas fa-check"></i></span>&nbsp; Accion
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <div className="section">
                        <p className="has-text-centered">No hay operaciones en curso.</p>
                    </div>
                )}
            </React.Fragment>
        );
    }
}