import React from 'react';

export default class VehicleSearchForm extends React.Component {
    render() {
        return (
            <React.Fragment>
                <form>
                    <div className="columns">
                        <div className="column is-one-quarter">
                            <div className="field">
                                <label className="label">Fecha desde</label>
                                <div className="control">
                                    <input name="fechaDesde" className="input" type="text" placeholder="Fecha desde"/>
                                </div>
                            </div>
                        </div>

                        <div className="column is-one-quarter">
                            <div className="field">
                                <label className="label">Fecha hasta</label>
                                <div className="control">
                                    <input name="fechaHasta" className="input" type="text" placeholder="Fecha hasta"/>
                                </div>
                            </div>
                        </div>

                        <div className="column is-one-quarter">
                            <div className="field">
                                <label className="label">Localidad</label>
                                <div className="control">
                                    <input name="localidad" className="input" type="text" placeholder="Localidad"/>
                                </div>
                            </div>
                        </div>

                        <div className="column is-one-quarter">
                            <div className="field">
                                <label className="label is-hidden-mobile">&nbsp;</label>
                                <div className="control">
                                    <button name="Confirm" type="button" className="button is-light is-fullwidth">Buscar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}