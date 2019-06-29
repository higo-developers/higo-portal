export class OperationRequest {
    constructor(fechaHoraDesde, fechaHoraHasta, idAdquiriente, idVehiculo, montoAcordado) {
        this.fechaHoraDesde = fechaHoraDesde;
        this.fechaHoraHasta = fechaHoraHasta;
        this.idAdquiriente = idAdquiriente;
        this.idVehiculo = idVehiculo;
        this.montoAcordado = montoAcordado;
    }
}