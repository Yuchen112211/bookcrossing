import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { status: "password" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.status === "password") {
      this.setState({ status: "text" });
    } else {
      this.setState({ status: "password" });
    }
  }

  render() {
    return (
      <form action="/users/signup" method="post" className="tm-contact-form">
        <div className="form-group">
          <input type="text" name="Username" className="form-control" placeholder="Enter username" required/>
        </div>
        <div className="form-group">
          <input type={this.state.status} name="Password" className="form-control" placeholder="Enter username" required/>
          <input type="checkbox" onClick={this.handleClick} />
            Show Password{" "}
        </div>
        <div className="form-group tm-d-flex">
          <button type="submit" className="signupbtn">
          Sign Up
          </button>
        </div>
      </form>
    );
  }
}

export default App;
