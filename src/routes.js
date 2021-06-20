import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { auth } from "./firebase";
import { PrivateRoute, PublicRoute } from "./AuthGuard";

//Pages
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";

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
            <Route exact path={"/home"} component={HomePage} />
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