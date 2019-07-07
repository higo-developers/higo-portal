import FilteredVehiclesPage from "../pages/FilteredVehiclesPage";
import LoginPage from "../pages/LoginPage";
import Navbar from "./layout/Navbar";
import NotFoundPage from "../pages/NotFoundPage";
import React from "react";
import VehicleDetailPage from "../pages/VehicleDetailPage";
import UserRegisterPage from "../pages/UserRegisterPage";
import UserEditPage from "../pages/UserEditPage";
import VehicleSearchMapPage from "../pages/VehicleSearchMapPage";
import VehicleSearchPage from "../pages/VehicleSearchPage";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import ReservePage from "../pages/ReservePage";
import ProtectedRoute from "./authentication/ProtectedRoute";
import {Routes} from "../utils/Constants";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar/>

            <Switch>
                <Route exact path={Routes.BASE} render={() => <Redirect to={Routes.SEARCH}/>}/>
                <Route exact path={Routes.LOGIN} component={LoginPage}/>
                <Route exact path={Routes.SEARCH} component={VehicleSearchPage}/>
                <Route exact path={Routes.SEARCH_BY_MAP} component={VehicleSearchMapPage}/>
                <Route exact path={Routes.VEHICLES} component={FilteredVehiclesPage}/>
                <Route exact path={Routes.VEHICLE_BY_ID} component={VehicleDetailPage}/>
                <Route exact path={Routes.REGISTER_USER} component={UserRegisterPage}/>
                <Route exact path={Routes.EDIT_USER} component={UserEditPage}/>

                <ProtectedRoute exact path={Routes.VEHICLE_BY_ID_RESERVE} component={ReservePage}/>

                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );
}