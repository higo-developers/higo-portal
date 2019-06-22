import React from 'react';
import OperationResource from "../resources/OperationResource";
// import { isNotNullOrUndefined } from "../utils/Utils";

const  ESTADO_OPERACION_PENDIENTE= "3";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: undefined,
            formData: {
                IdAdquirente: parseInt(localStorage.getItem('user')), 
                IdVehiculo: this.props.match.params.id, 
                IdEstadoOperacion: ESTADO_OPERACION_PENDIENTE, 
                FechaHoraDesde: undefined, 
                FechaHoraHasta: undefined, 
                MontoAcordado: undefined, 
                MontoEfectivo: undefined, 
                IdMedioPago: undefined
            }
        };

        this._isMounted = false;
    }

    componentDidMount= async () => {
        this._isMounted = true;
        try {
            await OperationResource.doOperation(this.state.formData);

            // if (isNotNullOrUndefined(response.errorMessage)) throw new Error(response.errorMessage);

            // login(response, () => { this.props.history.push("/") });

            this._isMounted && this.setState({loading: false, error: undefined});
        } catch (e) {
            this.setState({loading: false, error: e});
        }
    }
    componentWillMount(){
    debugger;;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        debugger;;
        return (
            <React.Fragment>
                
            </React.Fragment>
        );
    }
}