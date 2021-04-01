import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { Button, Container } from "reactstrap";
import { BookHalf, Stars } from "react-bootstrap-icons";

function WelcomeHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/header.jpg").default + ")",
          }}
          ref={pageHeader}
        ></div>

        <Container>
          <div className="content-center brand">
            <BookHalf size={96} />
            <h1 className="title">Welcome to Bookcrossing</h1>
            <Button
              className="btn-round"
              color="info"
              to="/signup"
              size="lg"
              tag={Link}
            >
              <Stars />
              &nbsp;&nbsp;&nbsp;Get Started&nbsp;&nbsp;&nbsp;
              <Stars />
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default WelcomeHeader;
