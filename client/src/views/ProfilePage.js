import React from "react";
import {
  Switch,
  Redirect,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { Envelope, Pencil } from "react-bootstrap-icons";

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
} from "reactstrap";

// core components
import Navigation from "components/Navigation/Navigation.js";
import Header from "components/Headers/ProfilePageHeader";
import Footer from "components/Footer/Footer.js";

function ProfilePage() {
  let match = useRouteMatch();

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
  const [userData, setUserData] = React.useState({
    username: username,
    sent: [],
    received: [],
    traveling: [],
  });
  const [currentList, setCurrentList] = React.useState([]);
  const [pills, setPills] = React.useState(0);

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
          firstName={userData.firstname}
          lastName={userData.lastname}
          sent={userData.sent.length}
          received={userData.received.length}
          traveling={userData.traveling.length}
        />
        <div className="section">
          <Container>
            <div className="button-container">
              {username === userData.username ? (
                <Button className="btn-round" color="info" size="lg">
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
                      className="btn-round btn-icon"
                      color="default"
                      id="tooltip515203352"
                      size="lg"
                      href={`https://twitter.com/${userData.twitter}`}
                      target="_blank"
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>,
                    <UncontrolledTooltip delay={0} target="tooltip515203352">
                      Follow me on Twitter
                    </UncontrolledTooltip>,
                  ]
                : null}

              {userData.instagram
                ? [
                    <Button
                      className="btn-round btn-icon"
                      color="default"
                      id="tooltip340339231"
                      size="lg"
                      href={`https://instagram.com/${userData.instagram}`}
                      target="_blank"
                    >
                      <i className="fab fa-instagram"></i>
                    </Button>,
                    <UncontrolledTooltip delay={0} target="tooltip340339231">
                      Follow me on Instagram
                    </UncontrolledTooltip>,
                  ]
                : null}
            </div>
            <h3 className="title">About me</h3>
            <h5 className="description">{userData.about}</h5>
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">My Inventory</h4>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem>
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
                    <NavItem>
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
                    <NavItem>
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
          <h1> </h1>
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
        <Footer bgColor="black" />
      </div>
    </>
  );
}

function InventoryTable(props) {
  React.useEffect(() => {
    console.log(props);
  });
  return (
    <>
      <Row className="text-center">
        {props.list.map((item) => [
          <Col md="2">{item.crossingId}</Col>,
          <Col md="2">{item.fromUsername}</Col>,
          <Col md="2">{item.toUsername}</Col>,
          <Col md="3">{item.requestedAt}</Col>,
          <Col md="3">{item.receivedAt}</Col>,
        ])}
      </Row>
    </>
  );
}

export default ProfilePage;
