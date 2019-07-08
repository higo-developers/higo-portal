import React from 'react';
import GoBackButton from "../components/layout/GoBackButton";
import Tabs from "../components/layout/Tabs";
import ActiveTabContent from "../components/layout/ActiveTabContent";
import {OperationStatesGroup} from "../utils/Constants";

const tabList = [
    {
        code: OperationStatesGroup.PENDIENTES,
        title: "Pendientes",
        content: "Operaciones pendientes"
    }, {
        code: OperationStatesGroup.EN_CURSO,
        title: "En curso",
        content: "Operaciones en curso"
    }, {
        code: OperationStatesGroup.FINALIZADAS,
        title: "Finalizadas",
        content: "Operaciones finalizadas"
    }
];

export default class OperationsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: OperationStatesGroup.PENDIENTES
        };
    }

    changeActiveTab(tab) {
        this.setState({ activeTab: tab });
    }

    activeTabContent() {
        const activeIndex = tabList.findIndex((tab) => {
            return tab.code === this.state.activeTab;
        });

        return tabList[activeIndex].content;
    }

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
                        <Tabs tabList={tabList}
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