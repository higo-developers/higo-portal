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
import ProfileVehiclesPage from "../pages/ProfileVehiclesPage";
import ProfileVehicleFormPage from "../pages/ProfileVehicleFormPage";
import CompleteUserDataPage from "../pages/CompleteUserDataPage";
import OperationsPage from "../pages/OperationsPage";
import InitialControlPage from "../pages/InitialControlPage";
import FinalControlPage from "../pages/FinalControlPage";
import ConfirmOperationPaymentPage from "../pages/ConfirmOperationPaymentPage";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar/>

            <Switch>
                <Route exact path={Routes.BASE} render={() => <Redirect to={Routes.SEARCH}/>}/>
                <Route exact path={Routes.LOGIN} component={LoginPage}/>
                <Route exact path={Routes.COMPLETE_USER_DATA} component={CompleteUserDataPage}/>
                <Route exact path={Routes.SEARCH} component={VehicleSearchPage}/>
                <Route exact path={Routes.SEARCH_BY_MAP} component={VehicleSearchMapPage}/>
                <Route exact path={Routes.VEHICLES} component={FilteredVehiclesPage}/>
                <Route exact path={Routes.VEHICLE_BY_ID} component={VehicleDetailPage}/>
                <Route exact path={Routes.REGISTER_USER} component={UserRegisterPage}/>
                <Route exact path={Routes.EDIT_USER} component={UserEditPage}/>

                <ProtectedRoute exact path={Routes.VEHICLE_BY_ID_RESERVE} component={ReservePage}/>
                <ProtectedRoute exact path={Routes.PROFILE_VEHICLES} component={ProfileVehiclesPage}/>
                <ProtectedRoute exact path={Routes.PROFILE_VEHICLES_NEW} component={ProfileVehicleFormPage}/>
                <ProtectedRoute exact path={Routes.PROFILE_VEHICLES_EDIT} component={ProfileVehicleFormPage}/>
                <ProtectedRoute exact path={Routes.OPERATIONS} component={OperationsPage}/>

                <ProtectedRoute exact path={Routes.OPERATIONS_INITIAL_CONTROL} component={InitialControlPage}/>
                <ProtectedRoute exact path={Routes.OPERATIONS_FINAL_CONTROL} component={FinalControlPage}/>

                <ProtectedRoute exact path={Routes.OPERATIONS_PAYMENT} component={ConfirmOperationPaymentPage}/>

                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );
}