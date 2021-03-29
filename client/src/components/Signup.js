import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Signup = ({ setRegistering }) => {
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => {
    const getUrl = "/users/getUser";
    const signupUrl = "/users/signup";

    const body = {
      username: document.getElementById("signupUsername").value,
      password: document.getElementById("signupPassword").value,
      address: document.getElementById("mailing-address").value,
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
    };

    fetch(getUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: document.getElementById("signupUsername").value,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.msg === "success") {
          const msg = `User ${body.username} exists`;
          setErrMsg(msg);
          console.log(msg);
        } else {
          fetch(signupUrl, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          })
            .then(function (response) {
              console.log("Sign up successfully");
              setRegistering(false);
              setErrMsg("Sign up successfully");
            })
            .catch(function (error) {
              const msg = "Unknown Error, please try again.";
              console.log(msg);
              setErrMsg(msg);
            });
        }
      })
      .catch(function (error) {
        const msg = "Unknown issue, please try again.";
        console.log(msg);
        setErrMsg(msg);
      });
  };

  return (
    <div className={"register-form"} style={{ marginBottom: "180px" }}>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={"register-form"}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="username"
            id="signupUsername"
            placeholder="Username (6 or more characters)"
            pattern="[A-Za-z0-9]{6,}"
            ref={register({ required: "Username required!" })}
          />
          {errors.username && (
            <p id="usernameError" style={{ color: "red" }}>
              {errors.username.message}
            </p>
          )}
        </div>
        <div className={"form-group"}>
          <input
            type={"password"}
            className={"form-control"}
            name={"password"}
            id={"signupPassword"}
            placeholder="Password (8 or more characters)"
            pattern=".{8,}"
            ref={register({ required: "Password required!" })}
          />
        </div>
        {errors.password && (
          <p id="passwordError" style={{ color: "red" }}>
            {errors.password.message}
          </p>
        )}
        <div className={"form-group"}>
          <input
            type={"password"}
            className={"form-control"}
            name={"confirm_password"}
            id={"confirm-password"}
            placeholder="Confirm Password"
            pattern=".{8,}"
            ref={register({
              validate: (value) =>
                value === watch("password") || "Passwords does not match!",
            })}
          />
          {errors.confirm_password && (
            <p style={{ color: "red" }}>{errors.confirm_password.message}</p>
          )}
        </div>
        <div className={"form-group"}>
          <input
            type={"text"}
            className={"form-control"}
            name={"mailing_address"}
            id={"mailing-address"}
            placeholder="Mailing Address"
            ref={register({ required: "Mailing address required!" })}
          />
          {errors.confirm_password && (
            <p style={{ color: "red" }}>{errors.confirm_password.message}</p>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            ref={register}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            ref={register}
          />
        </div>
        <button className="btn btn-primary" type={"submit"}>
          C R E A T E
        </button>
      </form>
      <p id="duplicatesError" style={{ color: "red" }}>
        {errMsg}
      </p>
      <a href="/">Already has an account? Log in</a>
    </div>
  );
};

export default Signup;
