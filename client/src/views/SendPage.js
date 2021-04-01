import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import Navigation from "components/Navigation/Navigation.js";
import WelcomeHeader from "components/Headers/WelcomeHeader.js";
import HomeHeader from "components/Headers/HomeHeader.js";
import Footer from "components/Footer/Footer.js";

function SendPage() {
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
        <div className="main">
          <div className="section">Under Constuction!</div>
        </div>
        <Footer bgColor="black" />
      </div>
    </>
  );
}

export default SendPage;
