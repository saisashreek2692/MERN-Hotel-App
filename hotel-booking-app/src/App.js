import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { TopNav, Home, Login, Register } from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
