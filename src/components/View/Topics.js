import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ButtonView from './ButtonView';
import GridView from './GridView';

const Topics = () => {
  return (
    <div
      style={{
        minHeight: 360
      }}
      className="main"
    >
      <Switch>
        <Route path="/topics/button" component={ButtonView} />
        <Route path="/topics/grid" component={GridView} />
      </Switch>
    </div>
  );
};

export default Topics;
