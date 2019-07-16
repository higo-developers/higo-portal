import React from 'react';

export default function Footer() {
    return (
        <React.Fragment>
            <footer className="footer custom-footer has-text-grey-light">
                <div className="container">
                    <nav className="level">
                        <p className="level-item has-text-centered">
                            <span className="is-size-3 has-text-weight-bold">higo</span>
                        </p>
                        <p className="level-item has-text-centered">
                            <a href="https://www.facebook.com/higo.experiencia.5" target="_blank" className="has-text-grey-light higo-link">
                                <span className="icon is-size-4">
                                    <i className="fab fa-facebook-f"></i>
                                </span>
                            </a>
                        </p>
                        <p className="level-item has-text-centered">
                            <a href="https://twitter.com/try_higo/" target="_blank" className="has-text-grey-light higo-link">
                                <span className="icon is-size-4">
                                    <i className="fab fa-twitter"></i>
                                </span>
                            </a>
                        </p>
                        <p className="level-item has-text-centered">
                            <a href="https://www.instagram.com/try_higo/" target="_blank" className="has-text-grey-light higo-link">
                                <span className="icon is-size-4">
                                    <i className="fab fa-instagram"></i>
                                </span>
                            </a>
                        </p>
                    </nav>
                </div>
            </footer>
        </React.Fragment>
    );
}