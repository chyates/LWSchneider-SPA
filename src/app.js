import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import MainPage from './components/MainPage';
import HomePage from './components/HomePage';

const Capabilities = () => (
  <div>
    this is the capabilities page.
  </div>
)
const Values = () => (
  <div>
    this is the values page.
  </div>
)
const About = () => (
  <div>
    this is the about page.
  </div>
)
const Contact = () => (
  <div>
    this is the contact page.
  </div>
)
const routes = (
  <BrowserRouter>
    <div>
      <MainPage />
      <TransitionGroup>
        <CSSTransition>
          <Switch>
            <Route path="/" component={HomePage} exact={true} />
            <Route path="/capabilities" component={Capabilities} />
            <Route path="/values" component={Values} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
