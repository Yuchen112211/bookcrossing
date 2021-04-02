import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Col,
  Container,
  Row,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroup,
} from "reactstrap";
// import { BookHalf } from "react-bootstrap-icons";

function LibraryHeader(props) {
  const [searchError, setSearchError] = React.useState("");

  let pageHeader = React.createRef();
  React.useEffect(() => {
    if (window.innerWidth > 1991) {
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

  const onSearchClicked = () => {
    const url = "books/getBook";
    const isbn = document.getElementById("bookIsbn").value;
    const title = document.getElementById("bookTitle").value;
    if (!isbn && !title) {
      setSearchError("Must provide at least book isbn or title");
      return;
    }
    var body = {};
    if (isbn) {
      body.isbn = isbn;
    }
    if (title) {
      body.title = title;
    }
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
          props.setPageCount(parseInt(data.data.length / 10, 10) + 1);
          props.setSearchData(data.data);
          props.setSearchState(true);
        } else {
          console.log(`Books based on ${body} does not exists`);
        }
      });
  };

  const SearchForm = () => {
    return (
      <>
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title"> Search books </h2>
            </Col>
          </Row>
          <Col className="ml-auto mr-auto" md="4">
            <Card className="card-login card-plain">
              <Form action="" className="form" method="">
                <CardBody>
                  <InputGroup className={"no-border input-lg"}>
                    <Input
                      style={{
                        color: "white",
                      }}
                      id="bookIsbn"
                      placeholder="Book ISBN"
                      type="text"
                    ></Input>
                  </InputGroup>
                  <InputGroup className={"no-border input-lg"}>
                    <Input
                      style={{
                        color: "white",
                      }}
                      id="bookTitle"
                      placeholder="Book title"
                      type="text"
                    ></Input>
                  </InputGroup>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    block
                    className="btn-round btn-info"
                    color="info"
                    onClick={() => {
                      onSearchClicked();
                    }}
                    size="lg"
                  >
                    Search the book
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
          <div>
            <p id="searchError" style={{ color: "white" }}>
              {" "}
            </p>
          </div>
        </Container>
      </>
    );
  };

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

        <SearchForm />
      </div>
    </>
  );
}

export default LibraryHeader;
