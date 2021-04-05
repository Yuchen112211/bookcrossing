import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Input,
  InputGroup,
  Form,
  Row,
  Col,
  Modal,
} from "reactstrap";

// core components
import Navigation from "components/Navigation/Navigation.js";
import Footer from "components/Footer/Footer.js";

function ReceivePage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const onRegisterClicked = () => {
    console.log("hello");
    const url = "/api/books/register";
    const body = {
      bookId: document.getElementById("bookId").value,
      message: document.getElementById("message").value,
    };
    if (!body.bookId) {
      const msg = `Book ID cannot be empty`;
      setErrorMsg(msg);
      return;
    }
    setModalOpen(true);
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.msg === "success") {
          setModalOpen(true);
        } else {
          setErrorMsg("Invalid book Id.");
        }
      })
      .catch(function (error) {
        console.log(error);
        setErrorMsg("Unknown issue, please try again.");
      });
  };

  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <Navigation />
      <div className="page-header">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/header.jpg").default + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title"> Register a book </h2>
                <p>
                  {" "}
                  Have you received a book from another member? That is great
                  news — let's register it!{" "}
                </p>
              </Col>
            </Row>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="POST">
                  <CardBody>
                    <InputGroup className={"no-border input-lg"}>
                      <Input
                        style={{
                          color: "white",
                        }}
                        id="bookId"
                        placeholder="Book ID"
                        type="text"
                      ></Input>
                    </InputGroup>
                    <InputGroup className={"no-border input-lg"}>
                      <Input
                        style={{
                          color: "white",
                        }}
                        id="message"
                        placeholder="A message to the sender"
                        rows="3"
                        type="text"
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round btn-info"
                      color="info"
                      size="lg"
                      onClick={onRegisterClicked}
                    >
                      Register Book
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
            <div>
              <p id="errorMessage" style={{ color: "white" }}>
                {errorMsg}
              </p>
            </div>
          </Container>
        </div>
        <Modal
          isOpen={modalOpen}
          modalClassName="bd-example-modal-sm"
          toggle={() => setModalOpen(false)}
        >
          <div className="modal-header">
            <h3 className="modal-title" id="mySmallModalLabel">
              Congratulation!
            </h3>
          </div>
          <div className="modal-body">
            You have successfully registered the book!
          </div>
          <div className="modal-footer">
            <Button
              type="button"
              className="btn"
              onClick={() => setModalOpen(false)}
            >
              Register Another One
            </Button>
            <Button
              type="button"
              className="btn"
              color="info"
              to="/profile"
              tag={Link}
            >
              My Profile
            </Button>
          </div>
        </Modal>
        <Footer bgColor="black" />
      </div>
    </>
  );
}

export default ReceivePage;
