import React from 'react';
import {Link} from 'react-router-dom';

// reactstrap components
import {Col, Button, Container, Row, Modal, Progress} from 'reactstrap';
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
                <h2 className="title"> Send a book </h2>
                <div className="progress-container progress-info">
                  <span className="progress-badge">
                    Traveling: {travelingCount} out of 5 postcards
                  </span>
                  <Progress max="5" value={travelingCount}>
                    <span className="progress-value">
                      {5 - travelingCount} left
                    </span>
                  </Progress>
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
        <Modal
          isOpen={modalOpen}
          modalClassName="bd-example-modal-sm"
          toggle={() => setModalOpen(false)}
        >
          <div className="modal-header">
            <h3 className="modal-title" id="myModalLabel">
              Crossing ID: {crossing.crossingId}
            </h3>
          </div>
          <div className="modal-body">
            <h5>Please send your book to the address:</h5>
            <h5>{crossing.mailingAddress}</h5>
            <i>Reminder: Do not forget attch the Crossing ID</i>
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
        </Modal>
        <Footer bgColor="blue" />
      </div>
    </>
  );
}

export default SendPage;
