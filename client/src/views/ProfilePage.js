import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import { Stars } from "react-bootstrap-icons";

// core components
import Navigation from "components/Navigation/Navigation.js";
import Header from "components/Headers/WelcomeHeader.js";
import Footer from "components/Footer/Footer.js";

function ProfilePage() {
  const [signedIn, setSignedIn] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <Navigation />
      <div className="wrapper">
        <Header />
        <div className="main">
          
        </div>
        <Footer bgColor="black"/>
      </div>
    </>
  );
}

export default ProfilePage;
