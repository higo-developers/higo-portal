import React from 'react';

export default class PendingOperationsGrid extends React.Component {
    render() {
        console.log(this.props.role);
        console.log(this.props.data);

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
                                <th>Dato X</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>&nbsp;</td>
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
                        <p className="has-text-centered">No hay operaciones pendientes.</p>
                    </div>
                )}
            </React.Fragment>
        );
    }
}