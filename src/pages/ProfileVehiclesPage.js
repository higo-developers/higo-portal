import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import Loading from "../components/layout/Loading";
import Error from "../components/layout/Error";
import ProfileResource from "../resources/ProfileResource";
import {Link} from "react-router-dom";
import Modal from "../components/layout/Modal";
import {locationDataAsArray} from "../utils/LocationUtils";

const VehicleStatus = {
    ACTIVO: <span className="tag is-success is-medium"><span className="icon"><i className="fas fa-check"></i></span>&nbsp; Actiivo</span>,
    INACTIVO: <span className="tag is-danger is-medium"><span className="icon"><i className="fas fa-times"></i></span>&nbsp; Inactivo</span>,
    PENDIENTE: <span className="tag is-info is-medium"><span className="icon"><i className="fas fa-hourglass-half"></i></span>&nbsp; Pendiente</span>
};

const LOCATION_SEPARATOR = " - ";
const CONFIRM_VEHICLE_DELETE_MODAL_TITLE = "¿Eliminar vehículo?";

export default class ProfileVehiclesPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            deleteModalIsOpen: false,
            loading: true,
            error: null,
            data: []
        };

        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.handleVehicleDelete = this.handleVehicleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const data = await ProfileResource.getUserVehicles();
            this.setState({loading: false, data: data});
        } catch (error) {
            this.setState({loading: false, error: error});
        }
    };

    toggleDeleteModal = () => {
        this.setState((prev, props) => {
            const isOpen = !prev.deleteModalIsOpen;
            return {deleteModalIsOpen: isOpen};
        });
    };

    handleVehicleDelete = async (vehicleId) => {
        try {
            await ProfileResource.deleteVehicle(vehicleId);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        if (this.state.loading)
            return <Loading/>;

        if (this.state.error)
            return <Error/>;

        const noResults = <p className="subtitle">No hay veh&iacute;culos cargados.</p>;

        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">Veh&iacute;culos</h1>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <GoBackButton/>
                                </div>
                                <div className="level-item">
                                    <Link className={"button is-dark"} to={`/profile/vehicles/new`}>
                                        <i className="fas fa-plus"></i>&nbsp; Nuevo
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        {this.state.data.length ? (
                            <table className="table is-striped is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Ubicaci&oacute;n</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                {this.state.data.map(vehicle => {
                                    return (
                                        <tbody key={vehicle.id}>
                                            <tr>
                                                <td>{vehicle.marca}</td>
                                                <td>{vehicle.modelo}</td>
                                                <td>{locationDataAsArray(vehicle.locacion).join(LOCATION_SEPARATOR)}</td>
                                                <td>{VehicleStatus[vehicle.estado]}</td>
                                                <td>
                                                    <div className="buttons">
                                                        <Link className={"button is-light"} to={`/profile/vehicles/${vehicle.id}/edit`}>
                                                            <span className="icon"><i className="fas fa-edit"></i></span>&nbsp; Editar
                                                        </Link>

                                                        <button className="button is-danger" onClick={this.toggleDeleteModal}>
                                                            <span><i className="fas fa-trash-alt"></i></span>&nbsp;  Eliminar
                                                        </button>

                                                        <Modal closeModal={this.toggleDeleteModal}
                                                               modalState={this.state.deleteModalIsOpen}
                                                               title={CONFIRM_VEHICLE_DELETE_MODAL_TITLE}
                                                               confirmCallback={() => {this.handleVehicleDelete(vehicle.id)}}
                                                        >
                                                            <p>Est&aacute; por eliminar su <strong>{vehicle.marca} {vehicle.modelo}</strong></p>
                                                        </Modal>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        ) : noResults}
                    </div>
                </section>
            </React.Fragment>
        );
    }
}