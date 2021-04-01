import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { Button, Col, Container, Row } from "reactstrap";
import { BookHalf } from "react-bootstrap-icons";

function HomeHeader() {
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
            <Row>
              <Col md="4" />
              <Col md="4">
                <Button
                  block
                  className="btn-round"
                  color="info"
                  to="/send"
                  size="lg"
                  tag={Link}
                  md="12"
                >
                  Send a book
                </Button>
              </Col>
              <Col md="4" />
            </Row>
            <Row>
              <Col md="4" />
              <Col md="4">
                <Button
                  block
                  className="btn-round"
                  color="info"
                  to="/receive"
                  size="lg"
                  tag={Link}
                  md="12"
                >
                  Register a book
                </Button>
              </Col>
              <Col md="4" />
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default HomeHeader;
