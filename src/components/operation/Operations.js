import React from 'react';
import {OperationStatesGroup} from "../../utils/Constants";
import PendingOperationsGrid from "./PendingOperationsGrid";
import OnGoingOperationsGrid from "./OnGoingOperationsGrid";
import FinishedOperationsGrid from "./FinishedOperationsGrid";
import Tabs from "../layout/Tabs";
import ActiveTabContent from "../layout/ActiveTabContent";

export default class Operations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabList: [
                { code: OperationStatesGroup.PENDING, title: "Pendientes", content: <PendingOperationsGrid role={this.props.role} data={this.props.data.pendientes}/> },
                { code: OperationStatesGroup.ONGOING, title: "En curso", content: <OnGoingOperationsGrid role={this.props.role} data={this.props.data.enCurso}/> },
                { code: OperationStatesGroup.FINISHED, title: "Finalizadas", content: <FinishedOperationsGrid role={this.props.role} data={this.props.data.finalizadas}/> }
            ],
            activeTab: OperationStatesGroup.PENDING
        };
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

    render() {
        return (
            <React.Fragment>
                <section className="section height-60">
                    <div className="container">
                        {this.props.title && (
                            <h3 className="subtitle">{this.props.title}</h3>
                        )}

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