import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Jumbo from "./components/Jumbo";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => (
  <Router>
    <div>
      <Jumbo />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
