import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home/Home";

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
