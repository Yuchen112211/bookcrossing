import React from "react";
import {
  Switch,
  Redirect,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import PropTypes from "prop-types";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Envelope, Pencil } from "react-bootstrap-icons";

// core components
import Navigation from "components/Navigation/Navigation.js";
import Header from "components/Headers/ProfilePageHeader";
import Footer from "components/Footer/Footer.js";

function ProfilePage() {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:username`}>
          <Profile />
        </Route>
        <Route path={match.path}>
          <Redirect to={`profile/${localStorage.getItem("loggedin")}`} />
        </Route>
      </Switch>
    </div>
  );
}

function Profile() {
  const { username } = useParams();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [userData, setUserData] = React.useState({
    username: username,
    sent: [],
    received: [],
    traveling: [],
  });
  const [currentList, setCurrentList] = React.useState([]);
  const [pills, setPills] = React.useState(0);

  const onUpdateClicked = () => {
    setErrMsg("");
    console.log("userData", userData);
    const url = "/api/users/update";
    const body = {
      firstname: document.getElementById("fieldFirstname").value,
      lastname: document.getElementById("fieldLastname").value,
      mailingAddress: document.getElementById("fieldMailingAddress").value,
      about: document.getElementById("fieldAbout").value,
      instagram: document.getElementById("fieldInstagram").value,
      twitter: document.getElementById("fieldTwitter").value,
    };
    console.log("body", body);
    if (!body.firstname || body.firstname.length === 0) {
      setErrMsg("First name cannot be empty");
      return;
    }
    if (!body.lastname || body.lastname.length === 0) {
      setErrMsg("Last name cannot be empty");
      return;
    }
    if (!body.mailingAddress || body.mailingAddress.length === 0) {
      setErrMsg("Mailing address cannot be empty");
      return;
    }
    if (!body.about || body.about.length === 0) {
      delete body.about;
    }
    if (!body.instagram || body.instagram.length === 0) {
      delete body.instagram;
    }
    if (!body.twitter || body.twitter.length === 0) {
      delete body.twitter;
    }
    console.log("body", body);
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.msg === "success") {
          window.location.reload();
        }
      })
      .catch(function (error) {
        const msg = "Unknown issue, please try again.";
        setErrMsg(msg);
      });
  };

  React.useEffect(() => {
    const url = `/api/users/info/${username}`;
    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.msg === "success") {
          if (pills === 0) {
            setCurrentList(data.data.sent);
          } else if (pills === 1) {
            setCurrentList(data.data.received);
          } else if (pills === 2) {
            setCurrentList(data.data.traveling);
          }
          setUserData(data.data);
          console.log(userData);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <>
      <Navigation />
      <div className="wrapper">
        <Header
          key={userData.username}
          username={userData.username}
          firstname={userData.firstname}
          lastname={userData.lastname}
          sentCount={userData.sent.length}
          receivedCount={userData.received.length}
          travelingCount={userData.traveling.length}
        />
        <div className="section">
          <Container>
            <div className="button-container">
              {username === userData.username ? (
                <Button
                  className="btn-round"
                  color="info"
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalOpen(true);
                  }}
                >
                  <Pencil /> Edit Profile
                </Button>
              ) : (
                <Button className="btn-round" color="info" size="lg">
                  <Envelope /> Send a message
                </Button>
              )}

              {userData.twitter
                ? [
                    <Button
                      key="buttonTwitter"
                      className="btn-round btn-icon"
                      color="default"
                      id="tooltip515203352"
                      size="lg"
                      href={`https://twitter.com/${userData.twitter}`}
                      target="_blank"
                      aria-label="TwitterLink"
                    >
                      <i className="fab fa-twitter"> </i>
                    </Button>,
                    <UncontrolledTooltip
                      key="tooltipTwitter"
                      delay={0}
                      target="tooltip515203352"
                    >
                      Follow me on Twitter
                    </UncontrolledTooltip>,
                  ]
                : null}

              {userData.instagram
                ? [
                    <Button
                      key="buttonInstagram"
                      className="btn-round btn-icon"
                      color="default"
                      id="tooltip340339231"
                      size="lg"
                      href={`https://instagram.com/${userData.instagram}`}
                      target="_blank"
                      aria-label="InstagramLink"
                    >
                      <i className="fab fa-instagram"></i>
                    </Button>,
                    <UncontrolledTooltip
                      key="tooltipInstagram"
                      delay={0}
                      target="tooltip340339231"
                    >
                      Follow me on Instagram
                    </UncontrolledTooltip>,
                  ]
                : null}
            </div>
            <h3 className="title">About me</h3>
            <h4 className="description">{userData.about}</h4>
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">My Inventory</h4>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem role="tab">
                      <NavLink
                        className={pills === 0 ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills(0);
                          setCurrentList(userData.sent);
                        }}
                      >
                        <i className="now-ui-icons ui-1_send"></i>
                        <p className="text-muted">Sent</p>
                      </NavLink>
                    </NavItem>
                    <NavItem role="tab">
                      <NavLink
                        className={pills === 1 ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills(1);
                          setCurrentList(userData.received);
                        }}
                      >
                        <i className="now-ui-icons files_box"></i>
                        <p className="text-muted">Received</p>
                      </NavLink>
                    </NavItem>
                    <NavItem role="tab">
                      <NavLink
                        className={pills === 2 ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills(2);
                          setCurrentList(userData.traveling);
                        }}
                      >
                        <i className="now-ui-icons shopping_delivery-fast"></i>
                        <p className="text-muted">Traveling</p>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              <TabContent className="gallery" activeTab={"pills" + pills}>
                <TabPane tabId="pills1"></TabPane>
                <TabPane tabId="pills2"></TabPane>
                <TabPane tabId="pills3"></TabPane>
              </TabContent>
            </Row>
          </Container>
          <h1 aria-label="emptyH1"> </h1>
          <Container>
            <Row className="text-center">
              <Col md="2">Book ID</Col>
              <Col md="2">From</Col>
              <Col md="2">To</Col>
              <Col md="3">Sent</Col>
              <Col md="3">Received</Col>
            </Row>
            <InventoryTable list={currentList} />
          </Container>
        </div>
        {username === userData.username ? (
          <Modal
            isOpen={modalOpen}
            modalClassName="bd-example-modal-sm"
            toggle={() => setModalOpen(false)}
          >
            <div className="modal-header">
              <h3 className="modal-title" id="myModalLabel">
                Edit Profile
              </h3>
            </div>
            <div className="modal-body">
              <Form action="" className="form" method="POST">
                <FormGroup>
                  <Label for="fieldFirstname">First Name</Label>
                  <Input
                    id="fieldFirstname"
                    type="text"
                    defaultValue={userData.firstname}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="fieldLastname">Last Name</Label>
                  <Input
                    id="fieldLastname"
                    type="text"
                    defaultValue={userData.lastname}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="fieldMailingAddress">Mailing Address</Label>
                  <Input
                    id="fieldMailingAddress"
                    type="text"
                    defaultValue={userData.mailingAddress}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="fieldAbout">About</Label>
                  <Input
                    id="fieldAbout"
                    rows="3"
                    type="textarea"
                    defaultValue={userData.about}
                  >
                    {userData.about}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="fieldInstagram">Instagram</Label>
                  <Input
                    id="fieldInstagram"
                    type="text"
                    defaultValue={userData.instagram}
                  >
                    {userData.instagram}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="fieldTwitter">Twitter</Label>
                  <Input
                    id="fieldTwitter"
                    type="text"
                    defaultValue={userData.twitter}
                  >
                    {userData.twitter}
                  </Input>
                </FormGroup>
                <Button
                  block
                  className="btn-round btn-info"
                  color="info"
                  size="lg"
                  onClick={onUpdateClicked}
                >
                  Update
                </Button>
              </Form>
              <p id="error" style={{ color: "red" }}>
                {errMsg}
              </p>
            </div>
          </Modal>
        ) : null}

        <Footer bgColor="black" />
      </div>
    </>
  );
}

function InventoryTable({ list }) {
  return (
    <>
      <Row className="text-center">
        {list.map((item) => [
          <Col key={item.crossingId} md="2">
            {item.crossingId}
          </Col>,
          <Col key={item.crossingId} md="2">
            {item.fromUsername}
          </Col>,
          <Col key={item.crossingId} md="2">
            {item.toUsername}
          </Col>,
          <Col key={item.crossingId} md="3">
            {item.requestedAt}
          </Col>,
          <Col key={item.crossingId} md="3">
            {item.receivedAt}
          </Col>,
        ])}
      </Row>
    </>
  );
}

InventoryTable.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      crossingId: PropTypes.string.isRequired,
      fromUsername: PropTypes.number.isRequired,
      toUsername: PropTypes.number.isRequired,
      requestedAt: PropTypes.number.isRequired,
      receivedAt: PropTypes.number,
    })
  ).isRequired,
};

export default ProfilePage;
