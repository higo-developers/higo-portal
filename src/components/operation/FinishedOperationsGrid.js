import React from 'react';

export default class FinishedOperationsGrid extends React.Component {
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <div className="section">
                        <p className="has-text-centered">No hay operaciones finalizadas.</p>
                    </div>
                )}
            </React.Fragment>
        );
    }
}