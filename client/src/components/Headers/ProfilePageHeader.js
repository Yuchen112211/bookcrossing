import React from "react";
import PropTypes from "prop-types";

// reactstrap components
import { Container } from "reactstrap";

function ProfilePageHeader({
  username,
  firstname,
  lastname,
  sentCount,
  receivedCount,
  travelingCount,
}) {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
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
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg5.jpg").default + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src={require("assets/img/ryan.jpg").default}></img>
          </div>
          <h3 className="title">
            {firstname} {lastname}
          </h3>
          <p className="category">@{username}</p>
          <div className="content">
            <div className="social-description">
              <h2>{sentCount}</h2>
              <p>Sent</p>
            </div>
            <div className="social-description">
              <h2>{receivedCount}</h2>
              <p>Received</p>
            </div>
            <div className="social-description">
              <h2>{travelingCount}</h2>
              <p>Traveling</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

ProfilePageHeader.propTypes = {
  username: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  sentCount: PropTypes.number,
  receivedCount: PropTypes.number,
  travelingCount: PropTypes.number,
};

export default ProfilePageHeader;
