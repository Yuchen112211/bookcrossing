import React, { useState } from "react";
import Login from "./components/Login";
import "./App.css";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [registering, setRegistering] = useState(false);

  return (
    <div className="loginForm">
      <Login userSetter={setLoggedInUser} registerSetter={setRegistering} />
    </div>
  );
};

export default App;
