import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './View/Home';
import About from './View/About';
const TopicRouter = ({ match }) => (
  <div>
    <Route path={`${match.url}/:topicId`} component={topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);
const topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);
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
        <Route path="/topics" component={TopicRouter} />
      </Switch>
    </div>
  );
};

export default Main;
