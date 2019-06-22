import React from 'react';
import VehicleThumbnail from "./VehicleThumbnail";

export default class VehicleThumbnailList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="columns is-multiline">
                    {
                        this.props.vehicles.map((vehicle) => {
                            return (
                                <div className="column is-one-third" key={vehicle.id}>
                                    <VehicleThumbnail vehicle={vehicle} dateTimes={this.props.dateTimes}/>
                                </div>
                            )
                        })
                    }
                </div>
            </React.Fragment>
        )
    }
}