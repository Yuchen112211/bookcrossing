import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ pageSetter, pageCount }) => {
  const pages = () => {
    var indexes = [];
    for (var i = 1; i < pageCount + 1; i++) {
      indexes.push(i);
    }
    return indexes.map((index) => (
      <td key={index}>
        <a
          className="active"
          href="#"
          onClick={() => {
            pageSetter(index);
          }}
        >
          {index}
        </a>
      </td>
    ));
  };

  return (
    <table>
      <tbody>
        <tr>{pages()}</tr>
      </tbody>
    </table>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
};

export default Pagination;
