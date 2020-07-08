import React from "react";
import Users from "./views/users/Index";
import Custumer from "./views/customer/Index";
import Services from "./views/services/Index";
import Scheduling from "./views/scheduling/Index";
import Dashboard from "./views/dashboard/dashboard";
import Login from "./views/login/index";
import { auth } from "./service/auth";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      let valid = auth;
      return valid ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: props.localtion }} />
      );
    }}
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRouter exact path="/index/:id" component={Dashboard} />
      <PrivateRouter exact path="/users" component={Users} />
      <PrivateRouter exact path="/customers/" component={Custumer} />
      <PrivateRouter exact path="/services" component={Services} />
      <PrivateRouter exact path="/scheduling" component={Scheduling} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
