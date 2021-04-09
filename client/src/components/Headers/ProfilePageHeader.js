import React from 'react';
import PropTypes from 'prop-types';

// reactstrap components
import {Container} from 'reactstrap';

function ProfilePageHeader({
  username,
  firstname,
  lastname,
  sentCount,
  receivedCount,
  travelingCount,
}) {
  const pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        const windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          'translate3d(0,' + windowScrollTop + 'px,0)';
      };
      window.addEventListener('scroll', updateScroll);
      return function cleanup() {
        window.removeEventListener('scroll', updateScroll);
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
              'url(' + require('assets/img/bg5.jpg').default + ')',
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src={require('assets/img/ryan.jpg').default}></img>
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
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  sentCount: PropTypes.number.isRequired,
  receivedCount: PropTypes.number.isRequired,
  travelingCount: PropTypes.number.isRequired,
};

export default ProfilePageHeader;
