import React from 'react';
import {OperationRoles} from "../../utils/Constants";
import ProviderOperationsGrid from "./ProviderOperationsGrid";
import AcquirerOperationsGrid from "./AcquirerOperationsGrid";

export default class OperationsGrid extends React.Component {
    render() {
        const hasData = this.props.data.length > 0;

        return (
            <React.Fragment>
                {hasData ? (
                    (this.props.role === OperationRoles.PROVIDER)
                        ? <ProviderOperationsGrid data={this.props.data}  onRedirectCases={this.props.onRedirectCases}/>
                        : <AcquirerOperationsGrid data={this.props.data}/>

                ) : (
                    <div className="section">
                        <p className="has-text-centered">{this.props.emptyDataMessage}</p>
                    </div>
                )}
            </React.Fragment>
        );
    }
}