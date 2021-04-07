import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import { BookHalf } from "react-bootstrap-icons";

function SearchHeader(props) {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 1991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/header.jpg").default + ")",
          }}
          ref={pageHeader}
        ></div>

        <Container>
          <div className="content-center brand">
            <BookHalf size={96} />
            <h1 className="title">
              We found {props.bookCount} books based on your search!
            </h1>
          </div>
        </Container>
      </div>
    </>
  );
}

export default SearchHeader;
