import React, { useState } from "react";

const Login = ({ userSetter, registerSetter }) => {
  const [loginError, setLoginError] = useState("");

  const onLoginCLicked = () => {
    const url = "/users/getUser";
    const body = {
      username: document.getElementById("loginUsername").value,
      password: document.getElementById("loginPassword").value,
    };
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.msg === "success") {
          console.log(`User ${body.username} Log in success!`);
          userSetter(data);
        } else {
          console.log(`User ${body.username} does not exists`);
        }
      })
      .catch(function (error) {
        const msg = "Unknown issue, please try again.";
        console.log(msg);
        setLoginError(msg);
      });
  };

  return (
    <div id="login">
      <h1>Log In</h1>
      <div className="form-group">
        <input
          id="loginUsername"
          type="text"
          name="username"
          className="form-control"
          placeholder="Enter username"
          required
        />
      </div>
      <div className="form-group">
        <input
          id="loginPassword"
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter username"
          required
        />
      </div>
      <div className="form-group tm-d-flex">
        <button type="submit" className="signupbtn" onClick={onLoginCLicked}>
          Login
        </button>
      </div>
      <div className="mt-4">
        <div className="d-flex justify-content-center links">
          Don't have an account?{" "}
          <a href="#" className="ml-2" onClick={() => registerSetter(true)}>
            {" "}
            Sign Up
          </a>
        </div>
        <div className="d-flex justify-content-center links"></div>
      </div>
      <p id="login-error">{loginError}</p>
      <p id="loginError">{loginError}</p>
    </div>
  );
};

export default Login;
