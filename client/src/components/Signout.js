import React, { useState } from "react";

const Signout = () => {
  const user = localStorage.getItem("loggedin");
  return (
    <div className="container">
      <div className="row">
        <div className="col-4" />
        <div className="col-3">
          {" "}
          Hello <b>{user}</b>! Welcome!
        </div>
        <div className="col-2">
          <a
            href="/"
            className="Signout-link"
            onClick={() => {
              localStorage.removeItem("loggedin");
            }}
          >
            Sign Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signout;
