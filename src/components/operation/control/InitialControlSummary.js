import React from 'react';

export default function InitialControlSummary(props) {
    return (
        <React.Fragment>
            <div className="box">
                <div className="columns is-multiline">
                    <div className="column has-text-justified is-full">
                        <h3 className="title is-4">Control inicial</h3>
                    </div>
                    <div className="column has-text-justified is-one-quarter">
                        <p>
                            <strong>Nivel de combustible:</strong>
                        </p>
                        <p>
                            {props.control.nivelCombustibleInicial}
                        </p>
                    </div>
                    <div className="column has-text-justified is-one-quarter">
                        <p>
                            <strong>Higiene externa:</strong>
                        </p>
                        <p>
                            {props.control.higieneExternaInicial}
                        </p>
                    </div>
                    <div className="column has-text-justified is-one-quarter">
                        <p>
                            <strong>Higiene interna:</strong>
                        </p>
                        <p>
                            {props.control.higieneInternaInicial}
                        </p>
                    </div>
                    <div className="column has-text-justified is-one-quarter">
                        <p>
                            <strong>Funcionamiento general:</strong>
                        </p>
                        <p>
                            {props.control.funcionamientoGeneralInicial}
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}