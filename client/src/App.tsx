import React, { FunctionComponent } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import Arena from "pages/Arena";
import Home from "pages/Home";
import Lobby from "pages/Lobby";
import Room from "pages/Room";
import Header from "components/app/Header";

const App: FunctionComponent = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Home />
      </Route>
      <Route exact={true} path="/lobby">
        <Header />
        <Lobby />
      </Route>
      <Route exact={true} path="/room">
        <Header />
        <Room />
      </Route>
      <Route path="/arena/:id">
        <Arena />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
