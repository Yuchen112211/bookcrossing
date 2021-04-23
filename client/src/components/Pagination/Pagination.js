/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Container, Row} from 'reactstrap';

const Pagination = ({currentPage, pageCount, pageSetter}) => {
  //{ currentPage, pageSetter, pageCount }
  const pages = () => {
    var indexes = [];

    if (currentPage > 5) {
      indexes.push('...');
    }
    for (
      var i = Math.max(1, currentPage - 4);
      i < Math.min(pageCount + 1, currentPage + 5);
      i++
    ) {
      indexes.push(i);
    }
    if (pageCount + 1 > currentPage + 5) {
      indexes.push('...');
    }
    return indexes.map((val, index) => (
      <b key={index}>
        {Number.isInteger(val) && (
          <Button
            className="btn-info"
            onClick={() => {
              pageSetter(val);
            }}
          >
            {val}
          </Button>
        )}
        {!Number.isInteger(val) && <Button className="btn-info">...</Button>}
      </b>
    ));
  };

  return (
    <div className="section">
      <Container>
        <Row>
          <Button
            className="btn-info"
            onClick={() => {
              if (currentPage > 0) {
                pageSetter(1);
              }
            }}
          >
            Head
          </Button>
          <Button
            className="btn-info"
            onClick={() => {
              if (currentPage > 1) {
                pageSetter(currentPage - 1);
              }
            }}
          >
            Prev
          </Button>
          {pages()}
          <Button
            className="btn-info"
            onClick={() => {
              if (currentPage < pageCount) {
                pageSetter(currentPage + 1);
              }
            }}
          >
            Next
          </Button>
          <Button
            className="btn-info"
            onClick={() => {
              if (currentPage < pageCount) {
                pageSetter(pageCount);
              }
            }}
          >
            Tail
          </Button>
        </Row>
      </Container>
    </div>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSetter: PropTypes.func.isRequired,
};

export default Pagination;
