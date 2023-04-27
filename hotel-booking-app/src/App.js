import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  TopNav,
  Home,
  Login,
  Register,
  Dashboard,
  DashboardSeller,
  NewHotels,
} from "./pages/index";
import PrivateRoute from "./pages/Components/PrivateRoute.jsx";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer
        position="top-center"
        draggable
        transition={Slide}
        theme="colored"
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/dashboard/seller"
          component={DashboardSeller}
        />
        <PrivateRoute exact path="/hotels/new" component={NewHotels} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
