/* eslint-disable */
import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

const Books = (props) => {
  const Book = (props) => {
    const book = props.book;

    return (
      <Col className="ml-auto mr-auto text-center" md="4">
        <Card>
          <CardBody style={{ height: "9rem" }}>
            <CardTitle>
              <b>{book.title}</b>
            </CardTitle>
            <CardSubtitle>
              by <i>{book.authors}</i>
            </CardSubtitle>
            <CardText>
              isbn:{"  "}
              {book.isbn}
            </CardText>
          </CardBody>
          <CardFooter>
            {props.sendButton && (
              <Button
                block
                onClick={() => {
                  localStorage.setItem("sentBook", JSON.stringify(book));
                }}
                to="/sendResult"
                size="lg"
                tag={Link}
              >
                {" "}
                Send this book
              </Button>
            )}
          </CardFooter>
        </Card>
      </Col>
    );
  };

  const comps = props.data.map((book) => {
    return <Book book={book} key={book.isbn} sendButton={props.sendButton} />;
  });

  return (
    <Container>
      <Row>
        <div className="ml-auto mr-auto text-center">
          <h1>Search Result</h1>
        </div>
      </Row>
      <Container>
        <Row>{comps}</Row>
      </Container>
    </Container>
  );
};

export default Books;
