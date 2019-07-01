export class OperationRequest {
    constructor(fechaHoraDesde, fechaHoraHasta, idAdquiriente, idVehiculo, montoAcordado) {
        this.fechaHoraDesde = fechaHoraDesde;
        this.fechaHoraHasta = fechaHoraHasta;
        this.idAdquiriente = idAdquiriente;
        this.idVehiculo = idVehiculo;
        this.montoAcordado = montoAcordado;
    }
}

export class ProfileVehicle {
    constructor() {
        this.id = null;
        this.modelo = "";
        this.estado = "";
        this.combustible = "";
        this.tipo = "";
        this.cilindrada = undefined;
        this.anno = "";
        this.ac = false;
        this.da = false;
        this.dh = false;
        this.alarma = false;
        this.cierreCentralizado = false;
        this.rompenieblasDelantero = false;
        this.rompenieblasTrasero = false;
        this.airbag = false;
        this.abs = false;
        this.controlTraccion = false;
        this.tapizadoCuero = false;
        this.patente = "";
    }
}