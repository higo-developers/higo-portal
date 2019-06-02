import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import VehicleSearchPage from "../pages/VehicleSearchPage";

export default function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/vehicles" />} />
          <Route exact path="/vehicles" component={VehicleSearchPage} />
        </Switch>
      </BrowserRouter>
  );
}