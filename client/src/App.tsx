import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import Profile from 'pages/Profile';
import Arena from 'pages/Arena';
import Home from 'pages/Home';
import Lobby from 'pages/Lobby';
import Room from 'pages/Room';
import Main from 'pages/Main';
import Header from 'components/app/Header';

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
      <Route exact={true} path='/'>
        <Header />
        <Home />
      </Route>
      <Route exact={true} path='/main'>
        <Header />
        <Main />
      </Route>
      <Route exact={true} path='/lobby'>
        <Header />
        <Lobby />
      </Route>
      <Route exact={true} path='/room'>
        <Header />
        <Room />
      </Route>
      <Route path='/arena/:id'>
        <Arena />
      </Route>
      <Route path='/profile'>
        <Header />
        <Profile />
      </Route>
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
};

export default App;
