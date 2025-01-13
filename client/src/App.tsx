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
import Header from "components/app/Header";
import CharacterSelect from "pages/Lobby/CharacterSelect";
import ArenaFight from "pages/Arena/[id]";

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
      <Route exact={true} path="/lobby/select-god">
        <Header />
        <CharacterSelect />
      </Route>
      <Route exact={true} path="/arena">
        <Header />
        <Arena />
      </Route>
      <Route path="/arena/:id">
        <ArenaFight />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
