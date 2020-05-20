import React from 'react';
import GlobalStyled from './global';
import Nav from './Nav';
import Board from './Board';
import SavedItems from './SavedItems';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyled />
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" exact component={Board} />
          <Route path="/saved" component={SavedItems} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
