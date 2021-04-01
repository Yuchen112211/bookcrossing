import React, { useState } from "react";

const SendBook = () => {
  const [bookSearchData, setBookSearchData] = useState();
  const [bookSearchState, setBookSearchState] = useState(false);
  const [searchErrMsg, setSearchErrMsg] = useState("");

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
          setBookSearchData(data.data);
          setBookSearchState(true);
        } else {
          console.log(`Books based on ${body} does not exists`);
        }
      });
  };

  const BookData = (props) => {
    const comps = props.data.map((book) => (
      <div className="row tm-mb-p" key={book.isbn}>
        <div className="col-6">{book.title}</div>
        <div className="col-6">{book.isbn}</div>
      </div>
    ));

    return (
      <div className="row">
        <h1>Search Result</h1>
        <div className="col-6">
          <b>Title </b>
        </div>
        <div className="col-6">
          <b> ISBN </b>
        </div>
        <div>{comps}</div>
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
      {bookSearchState && <BookData data={bookSearchData} />}
    </div>
  );
};

export default SendBook;
