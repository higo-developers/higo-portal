import React from 'react';
import VehicleThumbnail from "./VehicleThumbnail";
import {isNotNullOrUndefined} from "../../utils/Utils";

export default class VehicleThumbnailList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="columns is-multiline">
                    {
                        this.props.vehicles.map((vehicle) => {

                            const dateTimes = isNotNullOrUndefined(this.props.dateTimes) ? this.props.dateTimes : null;

                            return (
                                <div className="column is-one-third" key={vehicle.id}>
                                    <VehicleThumbnail
                                        vehicle={vehicle}
                                        dateTimes={dateTimes}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </React.Fragment>
        )
    }
}