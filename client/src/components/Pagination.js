import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, pageSetter, pageCount }) => {
  const pages = () => {
    var indexes = [];

    if (currentPage > 5) {
      indexes.push("...");
    }
    for (
      var i = Math.max(1, currentPage - 4);
      i < Math.min(pageCount + 1, currentPage + 5);
      i++
    ) {
      indexes.push(i);
    }
    if (pageCount + 1 > currentPage + 5) {
      indexes.push("...");
    }
    return indexes.map((val, index) => (
      <b key={index}>
        {Number.isInteger(val) && (
          <button
            href="#"
            onClick={() => {
              pageSetter(val);
            }}
          >
            {val}
          </button>
        )}
        {!Number.isInteger(val) && <button>...</button>}
      </b>
    ));
  };

  return (
    <div className="pagination">
      <button
        href="#"
        onClick={() => {
          if (currentPage > 0) {
            pageSetter(1);
          }
        }}
      >
        Head
      </button>
      <button
        href="#"
        onClick={() => {
          if (currentPage > 1) {
            pageSetter(currentPage - 1);
          }
        }}
      >
        Prev
      </button>
      {pages()}
      <button
        href="#"
        onClick={() => {
          if (currentPage < pageCount) {
            pageSetter(currentPage + 1);
          }
        }}
      >
        Next
      </button>
      <button
        href="#"
        onClick={() => {
          if (currentPage < pageCount) {
            pageSetter(pageCount);
          }
        }}
      >
        Tail
      </button>
    </div>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
};

export default Pagination;
