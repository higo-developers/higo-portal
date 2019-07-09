import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import Tabs from "../components/layout/Tabs";
import ActiveTabContent from "../components/layout/ActiveTabContent";
import {OperationStatesGroup} from "../utils/Constants";
import PendingOperationsGrid from "../components/operation/PendingOperationsGrid";
import OnGoingOperationsGrid from "../components/operation/OnGoingOperationsGrid";
import FinishedOperationsGrid from "../components/operation/FinishedOperationsGrid";

export default class OperationsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: undefined,
            tabList: [
                { code: OperationStatesGroup.PENDING, title: "Pendientes", content: null },
                { code: OperationStatesGroup.ONGOING, title: "En curso", content: null },
                { code: OperationStatesGroup.FINISHED, title: "Finalizadas", content: null }
            ],
            activeTab: OperationStatesGroup.PENDING
        };

        this.fetchData();
    }

    changeActiveTab(tab) {
        this.setState({ activeTab: tab });
    }

    activeTabContent() {
        const activeIndex = this.state.tabList.findIndex((tab) => {
            return tab.code === this.state.activeTab;
        });

        return this.state.tabList[activeIndex].content;
    }

    fetchData = () => {
        const pendingIndex = this.state.tabList.findIndex((tab) => { return tab.code === OperationStatesGroup.PENDING });
        const onGoingIndex = this.state.tabList.findIndex((tab) => { return tab.code === OperationStatesGroup.ONGOING });
        const finishedIndex = this.state.tabList.findIndex((tab) => { return tab.code === OperationStatesGroup.FINISHED });

        this.state.tabList[pendingIndex].content = <PendingOperationsGrid/>;
        this.state.tabList[onGoingIndex].content = <OnGoingOperationsGrid/>;
        this.state.tabList[finishedIndex].content = <FinishedOperationsGrid/>;
    };

    render() {
        return (
            <React.Fragment>
                <section className="section padding-bottom-0">
                    <div className="container">
                        <nav className="level is-mobile">
                            <div className="level-left is-hidden-mobile">
                                <h1 className="title">Operaciones</h1>
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
                        <Tabs tabList={this.state.tabList}
                              activeTab={this.state.activeTab}
                              changeActiveTab={this.changeActiveTab.bind(this)}
                        />

                        <ActiveTabContent key={this.state.activeTab} content={this.activeTabContent()} />
                    </div>
                </section>
            </React.Fragment>
        );
    }
}