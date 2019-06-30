import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";

const TITLE_EDIT_VEHICLE = "Editar vehículo";
const TITLE_NEW_VEHICLE = "Nuevo vehículo";

export default class ProfileVehicleFormPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ""
        }
    }

    componentDidMount() {
        let title;

        if (this.props.match.params.id) {
            title = TITLE_EDIT_VEHICLE;
        } else {
            title = TITLE_NEW_VEHICLE;
        }

        this.setState({
            title: title
        });
    }

    render() {
        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">{this.state.title}</h1>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <GoBackButton/>
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="container">
                            <form>
                                <div className="columns is-multiline">
                                    <div className="column is-full">Informacion general</div>

                                    <div className="column is-one-qarter">Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit. Aliquid, fugiat?
                                    </div>
                                    <div className="column is-one-qarter">Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit. Aliquid, fugiat?
                                    </div>
                                    <div className="column is-one-qarter">Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit. Aliquid, fugiat?
                                    </div>
                                    <div className="column is-one-qarter">Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit. Aliquid, fugiat?
                                    </div>
                                </div>

                                <br/> {/*SECCION*/}

                                <div className="columns">
                                    <div className="column is-half">
                                        <div className="columns is-multiline">
                                            <div className="column is-full">Equipamiento</div>

                                            <div className="column is-full">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                                                alias amet aspernatur doloremque ducimus earum error eum eveniet, fugit,
                                                maiores molestiae nulla quae recusandae rem repellendus suscipit
                                                temporibus, tenetur voluptas!
                                            </div>
                                        </div>
                                    </div>

                                    <div className="column is-half">
                                        <div className="columns is-multiline">
                                            <div className="column is-full">Combustible</div>

                                            <div className="column is-full">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                                                alias amet aspernatur doloremque ducimus earum error eum eveniet, fugit,
                                                maiores molestiae nulla quae recusandae rem repellendus suscipit
                                                temporibus, tenetur voluptas!
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/> {/*SECCION*/}

                                <div className="columns is-multiline">
                                    <div className="column is-full">Equipamiento</div>

                                    <div className="column is-full">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda
                                        dolore facere, odit quia velit voluptatem voluptates. Consectetur cumque dolor
                                        dolore dolores ducimus esse explicabo illum incidunt ipsa ipsam laboriosam
                                        necessitatibus nobis non officiis omnis praesentium provident quas quis
                                        reprehenderit saepe sed sit, tenetur, vel voluptas voluptatibus? Quia,
                                        repudiandae vitae.
                                    </div>
                                </div>

                                <br/> {/*SECCION*/}

                                <div className="columns is-multiline">
                                    <div className="column is-full">Botones</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}