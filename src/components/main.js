import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './View/Home';
import About from './View/About';
import Topics from './View/Topics';

const Main = () => {
  return (
    <div
      style={{
        minHeight: 360
      }}
      className="main"
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </Switch>
    </div>
  );
};

export default Main;
