import React from 'react';

export default class PendingOperationsGrid extends React.Component {
    render() {
        return (
            <React.Fragment>
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
                                    <button className="button">
                                        <span><i className="fas fa-check"></i></span>&nbsp; Aprobar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}