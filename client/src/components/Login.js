import React, { useState } from "react";

const Login = ({ userSetter, registerSetter }) => {
  const [loginError, setLoginError] = useState("");

  const onLoginClicked = () => {
    const url = "/users/getUser";
    const body = {
      username: document.getElementById("loginUsername").value,
      password: document.getElementById("loginPassword").value,
    };
    if (!body.username || !body.password) {
      const msg = `Please put in your username and password`;
      setLoginError(msg);
      return;
    }
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
          localStorage.setItem("loggedin", body.username);
          userSetter(data.data);
        } else {
          const msg = `User ${body.username} does not exists`;
          console.log(msg);
          setLoginError(msg);
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
        <button type="submit" className="loginbtn" onClick={onLoginClicked}>
          Login
        </button>
      </div>
      <p id="loginError" style={{ color: "red" }}>
        {loginError}
      </p>
      <div className="mt-4">
        <div className="d-flex justify-content-center links">
          Don't have an account?{" "}
          <button className="ml-2 btn" onClick={() => registerSetter(true)}>
            {" "}
            Sign Up
          </button>
        </div>
        <div className="d-flex justify-content-center links"></div>
      </div>
    </div>
  );
};

export default Login;
