import React from 'react';

export default function Modal({children, closeModal, modalState, title, confirmCallback}) {
    if (!modalState) {
        return null;
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" onClick={closeModal}/>
                </header>
                <section className="modal-card-body">
                    <div className="content">
                        {children}
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button" onClick={closeModal}>
                        <span className="icon"><i className="fas fa-times"></i></span>
                        <span>Cancelar</span>
                    </button>

                    {confirmCallback && (
                        <button className="button is-dark" onClick={() => {
                            confirmCallback();
                        }}>
                            <span className="icon"><i className="fas fa-check"></i></span>
                            <span>Confirmar</span>
                        </button>
                    )}
                </footer>
            </div>
        </div>
    );
}
