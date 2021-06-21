import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { auth } from "./Common/firebase";
import { PrivateRoute, PublicRoute } from "./Common/AuthGuard";

//Pages
import LoginPage from "./Views/LoginPage";
import HomePage from "./Views/HomePage";
import RegisterPage from "./Views/RegisterPage";

class RouteConfig extends Component{
    constructor() {
        super();
        this.state = {
          currentUser: Boolean,
        };
      }
    
      componentDidMount() {
        this.authlistener = auth().onAuthStateChanged((user) => {
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            this.setState({
              currentUser: true,
            });
          } else {
            localStorage.removeItem("user");
            this.setState({
              currentUser: false,
            });
          }
        });
      }
    
      componentWillUnmount() {
        this.authlistener();
      }
    
      render() {
        return (
          <Switch>
            {/* <Route exact path={"/home"} component={HomePage} /> */}
            <PublicRoute
              currentUser={this.state.currentUser}
              path="/home"
              component={HomePage}
            />
            <PublicRoute
              currentUser={this.state.currentUser}
              path={"/login"}
              component={LoginPage}
            />
            <PublicRoute
              currentUser={this.state.currentUser}
              path={"/register"}
              component={RegisterPage}
            />
            <PrivateRoute
              currentUser={this.state.currentUser}
              path="/"
              component={HomePage}
            />
          </Switch>
        );
      }
}

export default withRouter(RouteConfig);