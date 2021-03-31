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
          <a
            href="#"
            onClick={() => {
              pageSetter(val);
            }}
          >
            {val}
          </a>
        )}
        {!Number.isInteger(val) && <a>...</a>}
      </b>
    ));
  };

  return (
    <div className="pagination">
      <a
        href="#"
        onClick={() => {
          if (currentPage > 0) {
            pageSetter(1);
          }
        }}
      >
        Head
      </a>
      <a
        href="#"
        onClick={() => {
          if (currentPage > 0) {
            pageSetter(currentPage - 1);
          }
        }}
      >
        Prev
      </a>
      {pages()}
      <a
        href="#"
        onClick={() => {
          if (currentPage < pageCount) {
            pageSetter(currentPage + 1);
          }
        }}
      >
        Next
      </a>
      <a
        href="#"
        onClick={() => {
          if (currentPage < pageCount) {
            pageSetter(pageCount);
          }
        }}
      >
        Tail
      </a>
    </div>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
};

export default Pagination;
