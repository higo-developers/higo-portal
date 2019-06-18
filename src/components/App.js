import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import VehicleSearchPage from "../pages/VehicleSearchPage";
import Layout from "./layout/Layout";
import NotFoundPage from "../pages/NotFoundPage";
import FilteredVehiclesPage from "../pages/FilteredVehiclesPage";
import LoginPage from "../pages/LoginPage";
import VehicleDetailPage from "../pages/VehicleDetailPage";

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/search"/>}/>
                    <Route exact path="/search" component={VehicleSearchPage}/>
                    <Route path="/vehicles" component={FilteredVehiclesPage}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/vehicles" component={FilteredVehiclesPage}/>
                    <Route exact path="/vehicles/:id" component={VehicleDetailPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}