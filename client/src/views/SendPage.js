import React from "react";

// reactstrap components
import {
  Col,
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroup,
  Container,
  Row,
} from "reactstrap";
// core components
import Navigation from "components/Navigation/Navigation.js";
import HomeHeader from "components/Headers/HomeHeader.js";
import SearchHeader from "components/Headers/SearchHeader.js";
import Footer from "components/Footer/Footer.js";
import Pagination from "components/Pagination/Pagination.js";
import Books from "components/Books.js";

function SendPage() {
  const [pageCount, setPageCount] = React.useState();
  const [pageSelected, setPage] = React.useState(1);

  const [searchError, setSearchError] = React.useState();

  const [searchData, setSearchData] = React.useState([]);
  const [currentSearchData, setCurrentSearchData] = React.useState();
  const [searchState, setSearchState] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  React.useEffect(() => {
    const currentBooks = [];
    searchData.forEach((book, key) => {
      if (
        parseInt(key) >= (pageSelected - 1) * 10 &&
        parseInt(key) <= pageSelected * 10
      ) {
        currentBooks.push(book);
      }
    });
    setCurrentSearchData(currentBooks);
  }, [searchData, pageSelected]);

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
          setPageCount(parseInt(data.data.length / 10, 10) + 1);
          setSearchData(data.data);
          setSearchState(true);
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
              <h2 className="title"> Search your book! </h2>
            </Col>
          </Row>
        </Container>
        <Container>
          <Col className="ml-auto mr-auto" md="4">
            <Card className="card-login card-plain">
              <Form action="" className="form" method="">
                <CardBody>
                  <InputGroup className={"no-border input-lg"}>
                    <Input
                      id="bookIsbn"
                      placeholder="Book ISBN"
                      type="text"
                    ></Input>
                  </InputGroup>
                  <InputGroup className={"no-border input-lg"}>
                    <Input
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
              {searchError}
            </p>
          </div>
        </Container>
      </>
    );
  };

  return (
    <>
      <Navigation />
      {!searchState && <HomeHeader />}
      {searchState && <SearchHeader bookCount={searchData.length} />}
      <div className="wrapper">
        <div className="main">
          <div className="section section-about section-story-overview">
            {!searchState && <SearchForm />}
            {searchState && (
              <>
                <div className="section section-about section-story-overview">
                  <Books
                    sendButton={true}
                    data={currentSearchData}
                    pageSelected={pageSelected}
                  />
                </div>
                <Container>
                  <Button
                    block
                    className="btn-round btn-info"
                    color="info"
                    onClick={() => {
                      setSearchState(false);
                    }}
                    size="lg"
                  >
                    Search another
                  </Button>
                </Container>
              </>
            )}
            <Container>
              {searchState && (
                <Pagination
                  currentPage={pageSelected}
                  pageSetter={setPage}
                  pageCount={pageCount}
                />
              )}
            </Container>
          </div>
          <Footer bgColor="black" />
        </div>
      </div>
    </>
  );
}

export default SendPage;
