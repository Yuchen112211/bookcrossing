/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
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
} from 'reactstrap';
import {Link} from 'react-router-dom';

function Books({data, sendButton}) {
  const Book = ({book, key, sendButton}) => {
    return (
      <Col className="ml-auto mr-auto text-center" md="4">
        <Card>
          <CardBody style={{height: '9rem'}}>
            <CardTitle>
              <b>{book.title}</b>
            </CardTitle>
            <CardSubtitle>
              by <i>{book.authors}</i>
            </CardSubtitle>
            <CardText>
              isbn:{'  '}
              {book.isbn}
            </CardText>
          </CardBody>
          <CardFooter>
            {sendButton && (
              <Button
                block
                onClick={() => {
                  localStorage.setItem('sentBook', JSON.stringify(book));
                }}
                to="/sendResult"
                size="lg"
                tag={Link}
              >
                {' '}
                Send this book
              </Button>
            )}
          </CardFooter>
        </Card>
      </Col>
    );
  };

  const comps = data.map(book => {
    return <Book book={book} sendButton={sendButton} />;
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
}

Books.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      bookID: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.string.isRequired,
      average_rating: PropTypes.string,
      isbn: PropTypes.string.isRequired,
      isbn13: PropTypes.string,
      language_code: PropTypes.string,
      num_pages: PropTypes.string,
      ratings_count: PropTypes.string,
      text_reviews_count: PropTypes.string,
      publication_date: PropTypes.string,
      publisher: PropTypes.string,
    })
  ),
  sendButton: PropTypes.bool,
};

export default Books;
