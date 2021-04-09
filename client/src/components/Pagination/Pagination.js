/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Row } from "reactstrap";

const Pagination = (props) => {
  //{ currentPage, pageSetter, pageCount }
  const pages = () => {
    var indexes = [];

    if (props.currentPage > 5) {
      indexes.push("...");
    }
    for (
      var i = Math.max(1, props.currentPage - 4);
      i < Math.min(props.pageCount + 1, props.currentPage + 5);
      i++
    ) {
      indexes.push(i);
    }
    if (props.pageCount + 1 > props.currentPage + 5) {
      indexes.push("...");
    }
    return indexes.map((val, index) => (
      <b key={index}>
        {Number.isInteger(val) && (
          <Button
            onClick={() => {
              props.pageSetter(val);
            }}
          >
            {val}
          </Button>
        )}
        {!Number.isInteger(val) && <Button>...</Button>}
      </b>
    ));
  };

  return (
    <div className="section">
      <Container>
        <Row>
          <Button
            onClick={() => {
              if (props.currentPage > 0) {
                props.pageSetter(1);
              }
            }}
          >
            Head
          </Button>
          <Button
            onClick={() => {
              if (props.currentPage > 1) {
                props.pageSetter(props.currentPage - 1);
              }
            }}
          >
            Prev
          </Button>
          {pages()}
          <Button
            onClick={() => {
              if (props.currentPage < props.pageCount) {
                props.pageSetter(props.currentPage + 1);
              }
            }}
          >
            Next
          </Button>
          <Button
            onClick={() => {
              if (props.currentPage < props.pageCount) {
                props.pageSetter(props.pageCount);
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
};

export default Pagination;
