import React from 'react';
import {datetimeToDayMonYearHourMin, toCurrency} from "../../../utils/FormatUtils";

export default function OperationSummary(props) {
    return (
        <React.Fragment>
            <div className="box">
                <div className="columns is-multiline">
                    <div className="column has-text-justified is-full">
                        <h3 className="title is-4">{props.operation.vehiculo}</h3>
                    </div>
                    <div className="column has-text-justified is-one-quarter">
                        <p>
                            <strong>Desde:</strong>
                        </p>
                        <p>
                            {datetimeToDayMonYearHourMin(props.operation.fechaHoraDesde)}
                        </p>
                    </div>
                    <div className="column has-text-justified is-one-quarter">
                        <p>
                            <strong>Hasta:</strong>
                        </p>
                        <p>
                            {datetimeToDayMonYearHourMin(props.operation.fechaHoraHasta)}
                        </p>
                    </div>
                    <div className="column has-text-justified is-one-quarter">
                        <p>
                            <strong>Monto acordado:</strong>
                        </p>
                        <p>
                            {toCurrency(props.operation.montoAcordado, "ARS", "es-AR")}
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}