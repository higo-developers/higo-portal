import React from 'react';

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <section className="hero is-fullheight-with-navbar">
                <div className="hero-body">
                    <div className="container">
                        <div className="has-text-centered">
                            <p className="title">Page not found</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}