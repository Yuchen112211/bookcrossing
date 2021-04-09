import React from 'react';
import Navigation from 'components/Navigation/Navigation.js';
import HomeHeader from 'components/Headers/HomeHeader.js';
import Footer from 'components/Footer/Footer.js';

import {Link} from 'react-router-dom';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';

function SendResultPage() {
  const [recipient, setRecipient] = React.useState({});

  const book = JSON.parse(localStorage.getItem('sentBook'));

  React.useEffect(() => {
    document.body.classList.add('index-page');
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('index-page');
      document.body.classList.remove('sidebar-collapse');
    };
  });

  const getRandomUser = () => {
    fetch('/api/users/getRandom', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: localStorage.getItem('loggedin')}),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.msg === 'success') {
          localStorage.setItem('recipient', JSON.stringify(data.data[0]));
          setRecipient(data.data[0]);
        }
      });
  };

  if (Object.keys(recipient).length === 0) getRandomUser();

  const afterRedirect = () => {
    localStorage.removeItem('recipient');
    localStorage.removeItem('sentBook');
  };

  const confirmSend = () => {
    const sentBody = {
      toUsername: recipient.username,
      fromUsername: localStorage.getItem('loggedin'),
      toId: recipient._id.toString(),
      bookId: book.bookID,
    };
    fetch('/api/crossings/newSent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sentBody),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.msg === 'success') {
          afterRedirect();
        }
      });
  };

  return (
    <>
      <Navigation />
      <HomeHeader />
      <div className="wrapper">
        <div className="section">
          <Container className="blockquote">
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">{book.title}</h2>
              </Col>
            </Row>
            <Row>
              <Col md="6" />
              <Col className="ml-auto mr-auto" md="6">
                <h5>
                  By <i>{book.authors}</i>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col md="6" />
              <Col className="ml-auto mr-auto" md="6">
                <h5>
                  isbn: <i>{book.isbn}</i>
                </h5>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2>Are you sure you want to send this book?</h2>
              </Col>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="10">
                <h3>
                  If so, kindly send your book to user:{' '}
                  <b>{recipient.username}</b> with following information
                </h3>
              </Col>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="10">
                <Card>
                  <CardBody style={{height: '9rem'}}>
                    <CardTitle>
                      First name: <b>{recipient.firstname}</b>
                    </CardTitle>
                    <CardTitle>
                      Last name: <b>{recipient.lastname}</b>
                    </CardTitle>
                    <CardTitle>
                      Address: <b>{recipient.mailingAddress}</b>
                    </CardTitle>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div className="button-container">
              <Container>
                <Row>
                  <Col md="4" />
                  <Col className="ml-auto mr-auto text-center" md="2">
                    <Button
                      to="/profile"
                      onClick={() => {
                        alert('Successfully created sent record!');
                        confirmSend();
                        // Add record to crossing
                      }}
                      tag={Link}
                    >
                      Confirm
                    </Button>
                  </Col>
                  <Col className="ml-auto mr-auto text-center" md="2">
                    <Button
                      to="/send"
                      tag={Link}
                      onClick={() => {
                        afterRedirect();
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col md="4" />
                </Row>
              </Container>
            </div>
          </Container>
        </div>
        <Footer bgColor="black" />
      </div>
    </>
  );
}

export default SendResultPage;
