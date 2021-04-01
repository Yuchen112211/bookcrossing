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
  const [selected, setSelected] = React.useState();

  const Book = (props) => {
    const book = props.book;
    const [bgColor, setBgColor] = React.useState("");
    return (
      <Row
        onMouseEnter={() => {
          if (!selected) setBgColor("secondary");
          if (selected === book.isbn) setBgColor("secondary");
        }}
        onMouseLeave={() => {
          if (!selected) setBgColor("");
        }}
      >
        <Col
          className="ml-auto mr-auto text-center"
          onClick={() => {
            if (book.isbn === selected) {
              setSelected("");
            } else {
              setSelected(book.isbn);
            }
          }}
        >
          <Card color={bgColor}>
            <CardBody>
              <CardTitle>
                <b>{book.title}</b>
              </CardTitle>
              <CardSubtitle>by {book.authors}</CardSubtitle>
              <CardText>
                isbn:{"  "}
                {book.isbn}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };

  const comps = props.data.map((book) => {
    return <Book book={book} key={book.isbn} />;
  });

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
