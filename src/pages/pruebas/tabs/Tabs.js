import React from 'react';
import Tab from "./Tab";

export default class Tabs extends React.Component {
    render() {
        return (
            <div className="tabs is-centered is-fullwidth">
                <ul>
                    {this.props.tabList.map(tab =>
                        <Tab tab={tab}
                             key={tab.name}
                             activeTab={this.props.activeTab}
                             changeActiveTab={this.props.changeActiveTab}
                        />
                    )}
                </ul>
            </div>
        );
    }
}