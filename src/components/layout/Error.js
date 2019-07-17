import React from 'react';
import GoBackButton from "./GoBackButton";

export default function Error() {
    return (
        <React.Fragment>
            <section className="hero is-large">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">Ha ocurrido un error</h1>
                        <h2 className="subtitle">Por favor, intente m&aacute;s tarde.</h2>

                        <GoBackButton />
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}