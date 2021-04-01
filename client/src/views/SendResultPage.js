import React from "react";
import Navigation from "components/Navigation/Navigation.js";
import HomeHeader from "components/Headers/HomeHeader.js";
import Footer from "components/Footer/Footer.js";
import { Button, Container, Row, Col, Card } from "reactstrap";

function SendResultPage() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    localStorage.removeItem("sentBook");
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  const book = JSON.parse(localStorage.getItem("sentBook"));

  return (
    <>
      <Navigation />
      <HomeHeader />
      <div className="wrapper">
        <div className="main">
          <div className="section">
            {book.title} should be sent, random user should be generated
          </div>
        </div>
        <Footer bgColor="black" />
      </div>
    </>
  );
}

export default SendResultPage;
