import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import Navigation from "components/Navigation/Navigation.js";
import WelcomeHeader from "components/Headers/WelcomeHeader.js";
import HomeHeader from "components/Headers/HomeHeader.js";
import Footer from "components/Footer/Footer.js";

function Home() {
  const [signedIn, setSignedIn] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <Navigation signedIn={signedIn} setSignedIn={setSignedIn} />
      <div className="wrapper">
        {localStorage.getItem("loggedin") ? <HomeHeader /> : <WelcomeHeader />}
        <div className="main">
          <div className="section section-about section-story-overview">
            <Container>
              <Row>
                <Col className="ml-auto mr-auto text-center" md="8">
                  <h2 className="title">What is Bookcrossing?</h2>
                  <h5 className="blockquote">
                    It's a project that allows you to send books and receive
                    books back from random people. Here you can send a book to a
                    total random book lover, and receiving books from others!
                    Let's explore the true emotion and culture written into
                    words, grasp the wisdom of the human race.
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col className="ml-auto mr-auto text-center" md="8">
                  <h2 className="title">How does it work?</h2>
                </Col>
              </Row>
              <Row>
                <Col md="5">
                  <div
                    className="image-container image-left"
                    style={{
                      backgroundImage:
                        "url(" +
                        require("assets/img/how-does-it-work.png").default +
                        ")",
                    }}
                  ></div>
                </Col>
                <Col className="ml-auto mr-auto text-left" md="5">
                  <h4 className="text-muted">
                    1. Request an address and a Book ID
                  </h4>
                  <h4 className="text-muted">2. Mail a book to that address</h4>
                  <h4 className="text-muted">
                    3. Receive a book from another bookcrosser!
                  </h4>
                  <h4 className="text-muted">
                    4. Register the Book ID you have received
                  </h4>
                  <h4 className="text-muted">
                    5. Go to number 1 to receive more books!
                  </h4>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <Footer bgColor="black" />
      </div>
    </>
  );
}

export default Home;
