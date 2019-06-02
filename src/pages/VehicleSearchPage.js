import React from 'react';

export default class VehicleSearchPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="section higo-gradient-bg">
                    <div className="container">
                        <div className="card">
                            <div className="card-content">
                                <div className="content">
                                    <form>
                                        <div className="field">
                                            <label className="label">Fecha desde</label>
                                            <div className="control">
                                                <input name="fechaDesde" className="input" type="text" placeholder="Fecha desde"/>
                                            </div>
                                        </div>

                                        <div className="field">
                                            <label className="label">Fecha hasta</label>
                                            <div className="control">
                                                <input name="fechaHasta" className="input" type="text" placeholder="Fecha hasta"/>
                                            </div>
                                        </div>

                                        <div className="field">
                                            <label className="label">Localidad</label>
                                            <div className="control">
                                                <input name="localidad" className="input" type="text" placeholder="Localidad"/>
                                            </div>
                                        </div>

                                        <div className="field is-grouped">
                                            <div className="control">
                                                <button name="Confirm" type="button" className="button">Buscar</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}