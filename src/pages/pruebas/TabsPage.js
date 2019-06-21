import React from 'react';
import Tabs from "./tabs/Tabs";
import ActiveTabContent from "./tabs/ActiveTabContent";

export default class TabsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: "Buscá tu vehículo",
            tabList: [
                { name: "Buscá tu vehículo", content: "Acá va el Form" },
                { name: "Encontralo en el mapa", content: "Acá va el mapa" }
            ]
        };
    }

    changeActiveTab(tab) {
        this.setState({ activeTab: tab });
    }

    activeTabContent() {
        const activeIndex = this.state.tabList.findIndex((tab) => {
            return tab.name === this.state.activeTab;
        });

        return this.state.tabList[activeIndex].content;
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <Tabs tabList={this.state.tabList}
                          activeTab={this.state.activeTab}
                          changeActiveTab={this.changeActiveTab.bind(this)}
                    />
                        <ActiveTabContent key={this.state.activeTab} content={this.activeTabContent()} />
                </div>
            </section>
        );
    }
}