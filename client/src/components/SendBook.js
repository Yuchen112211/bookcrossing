import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const SendBook = () => {
  const [bookSearchData, setBookSearchData] = useState([]);
  const [currentBookSearchData, setCurrentBookSearchData] = useState();
  const [bookSearchState, setBookSearchState] = useState(false);
  const [searchErrMsg, setSearchErrMsg] = useState("");
  const [pageSelected, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const currentBooks = [];
    bookSearchData.forEach((book, key) => {
      if (
        parseInt(key) >= (pageSelected - 1) * 10 &&
        parseInt(key) <= pageSelected * 10
      ) {
        currentBooks.push(book);
      }
    });
    setCurrentBookSearchData(currentBooks);
  }, [bookSearchData, pageSelected]);

  const onSearchClicked = () => {
    const url = "books/getBook";
    const isbn = document.getElementById("book-isbn").value;
    const title = document.getElementById("book-title").value;
    if (!isbn && !title) {
      setSearchErrMsg("Must provide at least book isbn or title");
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
          setBookSearchData(data.data);
          setBookSearchState(true);
        } else {
          console.log(`Books based on ${body} does not exists`);
        }
      });
  };

  const BookData = (props) => {
    const currentPage = props.currentPage;
    const comps = props.data.map((book, key) => (
      <div className="row tm-mb-p" key={book.isbn}>
        <div className="col-4">{book.title}</div>
        <div className="col-4">{book.isbn}</div>
        <div className="col-4">
          <button
            onClick={() => {
              fetch("/users/getRandom")
                .then(function (response) {
                  return response.json();
                })
                .then(function (data) {
                  // TBD: Follow-up render/component
                  // TBD: Avoid duplicate (sending book to myself)
                  console.log(data.data[0].username);
                  alert(
                    `Got Random user: ${data.data[0].username} with address: ${data.data[0].mailing_address}`
                  );
                });
            }}
          >
            Send this Book
          </button>
        </div>
      </div>
    ));

    return (
      <div className="container">
        <div className="row">
          <h1>Search Result - Page {pageSelected}</h1>
          <div className="col-4">
            <b>Title </b>
          </div>
          <div className="col-4">
            <b> ISBN </b>
          </div>
          <div>{comps}</div>
        </div>
        <div className="row">
          {pageCount !== 0 && (
            <Pagination
              currentPage={pageSelected}
              pageSetter={setPage}
              pageCount={pageCount}
            />
          )}
        </div>
      </div>
    );
  };

  const bookSearch = (
    <div className="book-search">
      <p>Search the book by ISBN or title</p>
      <div className="form-group">
        <input
          id="book-isbn"
          className="book-isbn"
          type="text"
          name="isbn"
          placeholder="Enter book ISBN"
        />
      </div>
      <div className="form-group">
        <input
          id="book-title"
          className="book-title"
          type="text"
          name="title"
          placeholder="Enter book title"
        />
      </div>
      <div className="form-group">
        <button type="submit" className="searchbtn" onClick={onSearchClicked}>
          Search
        </button>
      </div>
      <p style={{ color: "red" }} id="search-error">
        {searchErrMsg}
      </p>
    </div>
  );

  return (
    <div>
      {!bookSearchState && bookSearch}
      {bookSearchState && (
        <BookData data={currentBookSearchData} currentPage={pageSelected} />
      )}
    </div>
  );
};

export default SendBook;
