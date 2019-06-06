import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import VehicleSearchPage from "../pages/VehicleSearchPage";
import Layout from "./layout/Layout";

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/vehicles"/>}/>
                    <Route exact path="/vehicles" component={VehicleSearchPage}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}