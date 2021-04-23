import React from 'react';
import {Link} from 'react-router-dom';

// reactstrap components
import {Col, Button, Container, Row} from 'reactstrap';
// core components
import Navigation from 'components/Navigation/Navigation.js';
import Footer from 'components/Footer/Footer.js';

function SendPage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [travelingCount, setTravelingCount] = React.useState(0);
  const [crossing, setCrossing] = React.useState({
    crossingId: null,
    mailingAddress: null,
  });

  const onSendClicked = () => {
    const url = '/api/crossings/send';
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.msg === 'success') {
          setTravelingCount(travelingCount + 1);
          setCrossing(data.data);
          setModalOpen(true);
        } else if (data.errors) {
          setErrorMsg(data.errors);
        }
      })
      .catch(function (error) {
        const msg = 'Unknown issue, please try again.';
        setErrorMsg(msg);
      });
  };

  React.useEffect(() => {
    fetch('/api/users/travelingCount', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.msg === 'success') {
          setTravelingCount(data.data.travelingCount);
        } else if (data.errors) {
          setErrorMsg(data.errors);
        }
      })
      .catch(function (error) {
        const msg = 'Unknown issue, please try again.';
        setErrorMsg(msg);
      });

    document.body.classList.add('login-page');
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('login-page');
      document.body.classList.remove('sidebar-collapse');
    };
  }, []);

  return (
    <>
      <Navigation />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              'url(' + require('assets/img/header.jpg').default + ')',
          }}
        ></div>
        <div className="content">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h1 className="title"> Send a book </h1>
                <div className="progress-container progress-info">
                  <span className="progress-badge">
                    Traveling: {travelingCount} out of 5 books
                  </span>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="5"
                      style={{width: '0%'}}
                      aria-label="travelingCount"
                    >
                      <span className="progress-value" title="LeftNumber">
                        {5 - travelingCount} left
                      </span>
                    </div>
                  </div>
                </div>
                <p>
                  You will be given a Crossing ID that you must attach it on the
                  book - the recipient will need it to register your postcard on
                  this website.
                </p>
              </Col>
            </Row>

            <Col className="ml-auto mr-auto" md="4">
              <Button
                block
                className="btn-round btn-info"
                color="info"
                size="lg"
                onClick={onSendClicked}
                disabled={travelingCount === 5}
                href={travelingCount === 5}
              >
                Request Address
              </Button>
            </Col>
            <div>
              <p id="errorMessage" style={{color: 'red'}}>
                {errorMsg}
              </p>
            </div>
          </Container>
        </div>
        {modalOpen ? (
          <div tabIndex="-1" style={{zIndex: "1050"}}>
            <div>
              <div
                className="modal bd-example-modal-sm fade show"
                role="dialog"
                tabIndex="-1"
                aria-label="sendBook"
                style={{display: "block"}}
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content" style={{color: "#000000"}}>
                    <div className="modal-header">
                      <p className="h3 modal-title" id="myModalLabel">
                        Crossing ID: {crossing.crossingId}
                      </p>
                    </div>
                    <div className="modal-body">
                      <p className="h5">
                        Please send your book to the address:
                      </p>
                      <p className="h5">{crossing.mailingAddress}</p>
                      <i>Reminder: Do not forget to attach the Crossing ID</i>
                    </div>
                    <div className="modal-footer">
                      <Button
                        type="button"
                        className="btn"
                        onClick={() => setModalOpen(false)}
                      >
                        Send Another One
                      </Button>
                      <Button
                        type="button"
                        className="btn"
                        color="info"
                        to="/profile"
                        tag={Link}
                      >
                        My Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <Footer bgColor="black" />
      </div>
    </>
  );
}

export default SendPage;
