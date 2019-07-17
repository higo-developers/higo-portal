import React from 'react';
import Tab from "./Tab";

export default class Tabs extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="tabs is-fullwidth">
                    <ul>
                        {this.props.tabList.map(tab =>
                            <Tab tab={tab} key={tab.code} activeTab={this.props.activeTab}
                                 changeActiveTab={this.props.changeActiveTab}
                            />
                        )}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}