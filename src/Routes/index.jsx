import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Menu from "../ItemMenu";
import Associate from "../Associate";
import Orders from "../Orders";
import TotalPage from "../TotalPage";
import Header from "../components/menu";

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/associate" component={Associate} />
      <Route path="/menu" component={Menu} />
      <Route path="/orders" component={Orders} />
      <Route path="/total" component={TotalPage} />
      <Redirect from="*" to="/menu" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
