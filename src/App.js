import React from 'react';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";
import Introduction from './views/Introduction';
import Doctors from './views/Doctors';
function App() {

  return (

    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/doctors">
          <Doctors />
        </Route>
        <Route path="/services">
          <Introduction />
        </Route>
        <Route path="/contacts">
          <Introduction />
        </Route>
        <Route path="/booking">

        </Route>
        <Route path="/sign_in">

        </Route>
        <Route path="/sign_up">

        </Route>
        <Route path="/" exact>
          <Introduction />
        </Route>
        <Route path="*" >
          404 Not Found
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
