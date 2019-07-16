import React from 'react';
import Modal from "../layout/Modal";
import {locationDataAsArray} from "../../utils/LocationUtils";

const LOCATION_DATA_SEPARATOR = " - ";

export default function UserDetailModal(props) {
    return (
        props.user
        && <Modal closeModal={props.onCloseModal} modalState={props.modalState} title={props.title}>
            <div className="columns is-multiline">
                <div className="column is-full">
                    <p className="title">{props.user.nombre}</p>
                </div>

                <div className="column is-full">
                    <p className="subtitle">
                        <strong>DNI:</strong>
                        <br/>
                        {props.user.dni}
                    </p>
                </div>

                <div className="column is-full">
                    <p className="subtitle">
                        <strong>E-mail:</strong>
                        <br/>
                        {props.user.email}
                    </p>
                </div>

                <div className="column is-full">
                    <p className="subtitle">
                        <strong>Tel&eacute;fono:</strong>
                        <br/>
                        {props.user.telefono}
                    </p>
                </div>

                <div className="column is-full">
                        <p className=""><i className="fas fa-map-marker-alt"></i>&nbsp; {locationDataAsArray(props.user).join(LOCATION_DATA_SEPARATOR)}</p>
                </div>
            </div>
        </Modal>
    );
}