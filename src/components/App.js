import FilteredVehiclesPage from "../pages/FilteredVehiclesPage";
import LoginPage from "../pages/LoginPage";
import Navbar from "./layout/Navbar";
import NotFoundPage from "../pages/NotFoundPage";
import React from "react";
import VehicleDetailPage from "../pages/VehicleDetailPage";
import VehicleSearchMapPage from "../pages/VehicleSearchMapPage";
import VehicleSearchPage from "../pages/VehicleSearchPage";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import ReservePage from "../pages/ReservePage";
import ProtectedRoute from "./authentication/ProtectedRoute";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar/>

            <Switch>
                <Route exact path="/" render={() => <Redirect to="/search"/>}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/search" component={VehicleSearchPage}/>
                <Route exact path="/search/map" component={VehicleSearchMapPage}/>
                <Route exact path="/vehicles" component={FilteredVehiclesPage}/>
                <Route exact path="/vehicles/:id" component={VehicleDetailPage}/>

                <ProtectedRoute exact path="/vehicles/:id/reserve" component={ReservePage}/>

                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );
}