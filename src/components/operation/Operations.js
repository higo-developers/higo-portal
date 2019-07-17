import React from 'react';
import {OperationStatesGroup} from "../../utils/Constants";
import Tabs from "../layout/Tabs";
import ActiveTabContent from "../layout/ActiveTabContent";
import OperationsGrid from "./OperationsGrid";

export default class Operations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabList: [
                { code: OperationStatesGroup.PENDING, title: "Pendientes", content: <OperationsGrid role={this.props.role} data={this.props.data.pendientes} emptyDataMessage={"No hay operaciones pendientes."} onRedirectCases={this.props.onRedirectCases}/> },
                { code: OperationStatesGroup.ONGOING, title: "En curso", content: <OperationsGrid role={this.props.role} data={this.props.data.enCurso} emptyDataMessage={"No hay operaciones en curso."} onRedirectCases={this.props.onRedirectCases}/> },
                { code: OperationStatesGroup.FINISHED, title: "Finalizadas", content: <OperationsGrid role={this.props.role} data={this.props.data.finalizadas} emptyDataMessage={"No hay operaciones finalizadas."} onRedirectCases={this.props.onRedirectCases}/> }
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
                <section className="section height-50">
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