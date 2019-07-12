import React from 'react';
import Modal from "../layout/Modal";

export default function ChangeOperationStatusModal(props) {
    return (
        <Modal closeModal={props.onCloseModal} modalState={props.modalState}>
            {props.content}
        </Modal>
    );
}