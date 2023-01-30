import React from 'react';
import Sidebar from './components/Sidebar';
import { Switch, Route, useRouteMatch} from "react-router-dom";
import Home from './routes/Home';

function Admin() {

  const { path, url } = useRouteMatch();

  return (
    <>
      <Sidebar url={url} />

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:id`}>
          <Home path={path}/>
        </Route>
      </Switch>
    </>
  );
}

export default Admin