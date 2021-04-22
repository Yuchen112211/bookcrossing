/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

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
} from 'reactstrap';
// import { BookHalf } from "react-bootstrap-icons";

function LibraryHeader({setPageCount, setSearchData, setSearchState}) {
  const [searchError, setSearchError] = React.useState('');

  const pageHeader = React.createRef();
  React.useEffect(() => {
    if (window.innerWidth > 1991) {
      const updateScroll = () => {
        const windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          'translate3d(0,' + windowScrollTop + 'px,0)';
      };
      window.addEventListener('scroll', updateScroll);
      return function cleanup() {
        window.removeEventListener('scroll', updateScroll);
      };
    }
  });

  const onSearchClicked = () => {
    const url = '/api/books/getBook';
    const isbn = document.getElementById('bookIsbn').value;
    const title = document.getElementById('bookTitle').value;
    if (!isbn && !title) {
      setSearchError('Must provide at least book isbn or title');
      return;
    }
    const body = {};
    if (isbn) {
      body.isbn = isbn;
    }
    if (title) {
      body.title = title;
    }
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.msg === 'success') {
          setPageCount(parseInt(data.data.length / 10, 10) + 1);
          setSearchData(data.data);
          setSearchState(true);
        } else {
          console.log(`Books based on ${body} does not exists`);
        }
      });
  };

  const formKeyPressed = (event) => {
    if (event.code == "Enter") {
      onSearchClicked()
    }
  }

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
              <Form action="" className="form" method="" onKeyDown={formKeyPressed}>
                <CardBody>
                  <InputGroup className={'no-border input-lg'}>
                    <Input
                      style={{
                        color: 'white',
                      }}
                      id="bookIsbn"
                      placeholder="Book ISBN"
                      type="text"
                    ></Input>
                  </InputGroup>
                  <InputGroup className={'no-border input-lg'}>
                    <Input
                      style={{
                        color: 'white',
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
            <p id="searchError" style={{color: 'white'}}>
              {searchError}
            </p>
          </div>
        </Container>
      </>
    );
  };

  return (
    <>
      <div className="page-header page-header-small clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              'url(' + require('assets/img/header.jpg').default + ')',
          }}
          ref={pageHeader}
        ></div>

        <SearchForm />
      </div>
    </>
  );
}

LibraryHeader.propTypes = {
  setPageCount: PropTypes.func.isRequired,
  setSearchData: PropTypes.func.isRequired,
  setSearchState: PropTypes.func.isRequired,
};

export default LibraryHeader;
