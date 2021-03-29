import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [registering, setRegistering] = useState(false);

  return (
    <div className="loginForm">
      {!loggedInUser && !registering && (
        <Login userSetter={setLoggedInUser} registerSetter={setRegistering} />
      )}
      {registering && <Signup setRegistering={setRegistering} />}
    </div>
  );
};

export default App;
