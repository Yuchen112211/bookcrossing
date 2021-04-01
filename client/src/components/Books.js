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
} from "reactstrap";

const Books = (props) => {
  const comps = props.data.map((book) => (
    <Row key={book.isbn}>
      <Col className="blockquote ml-auto mr-auto text-center">
        <Card>
          <CardBody>
            <CardTitle>
              <b>{book.title}</b>
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted">
              by {book.authors}
            </CardSubtitle>
            <CardText>
              isbn:{"  "}
              {book.isbn}
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ));

  return (
    <Container>
      <Row>
        <div className="ml-auto mr-auto text-center">
          <h1>Search Result</h1>
        </div>
      </Row>
      <Container>{comps}</Container>
    </Container>
  );
};

export default Books;
