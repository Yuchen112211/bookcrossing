import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = { users: [] };

  render() {
    return (
      <form action="signup" method="post">
        <div className="container">
          <h1> Sign up </h1>
          <label htmlFor="Username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            name="Username"
            required
          />
          <label htmlFor="Password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            name="Password"
            required
          />
          <div className="clearfix">
            <button type="button" className="cancelbtn">
              Cancel
            </button>
            <button type="submit" className="signupbtn">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default App;
