import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles from UI kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";

// pages
import Home from "views/Home.js";
import SigninPage from "views/SigninPage.js";
import SignupPage from "views/SignupPage.js";
import LibraryPage from "views/LibraryPage.js";
import ProfilePage from "views/ProfilePage.js";
import SendPage from "views/SendPage.js";
import ReceivePage from "views/ReceivePage.js";
import SendResultPage from "views/SendResultPage.js";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Switch>
          <Route path="/home" render={(props) => <Home {...props} />} />
          <Route
            path="/library"
            render={(props) => <LibraryPage {...props} />}
          />
          <Route
            path="/profile"
            render={(props) => <ProfilePage {...props} />}
          />
          <Route path="/signin" render={(props) => <SigninPage {...props} />} />
          <Route path="/signup" render={(props) => <SignupPage {...props} />} />
          <Route path="/send" render={(props) => <SendPage {...props} />} />
          <Route
            path="/sendResult"
            render={(props) => <SendResultPage {...props} />}
          />
          <Route
            path="/receive"
            render={(props) => <ReceivePage {...props} />}
          />
          <Redirect to="/home" />
          <Redirect from="/" to="/home" />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
}
