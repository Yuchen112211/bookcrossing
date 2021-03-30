import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Book from "./components/Book";
import Signout from "./components/Signout";
import "./App.css";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [registering, setRegistering] = useState(false);
  return (
    <div className="loginForm">
      {!localStorage.getItem("loggedin") && !loggedInUser && !registering && (
        <Login userSetter={setLoggedInUser} registerSetter={setRegistering} />
      )}
      {registering && <Signup setRegistering={setRegistering} />}
      {(localStorage.getItem("loggedin") || loggedInUser) && <Signout />}
      {(localStorage.getItem("loggedin") || loggedInUser) && <Book />}
    </div>
  );
};

export default App;
