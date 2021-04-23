import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
import { BookHalf, PersonCircle, ShieldLock } from "react-bootstrap-icons";

// core components
import Navigation from "components/Navigation/Navigation.js";
import Footer from "components/Footer/Footer.js";

function SigninPage(userSetter, registerSetter) {
  const [loginError, setLoginError] = React.useState("");
  const [usernameFocus, setUsernameFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);

  const onLoginClicked = () => {
    const url = "/api/signin";
    const body = {
      username: document.getElementById("fieldUsername").value,
      password: document.getElementById("fieldPassword").value,
    };
    if (!body.username || !body.password) {
      const msg = `Please put in your username and password`;
      setLoginError(msg);
      return;
    }
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
          console.log(`User ${body.username} Log in success!`);
          localStorage.setItem("loggedin", body.username);
          window.location = "/home";
        } else {
          const msg = `Incorrect information, check either your username or password. `;
          setLoginError(msg);
        }
      })
      .catch(function (error) {
        const msg = "Unknown issue, please try again.";
        console.log(msg);
        setLoginError(msg);
      });
  };

  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const formKeyPressed = (event) => {
    if (event.code == "Enter") {
      onLoginClicked()
    }
  }

  return (
    <>
      <Navigation />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/login.jpg").default + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <h1> {"Signing In"} </h1>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="POST" onKeyDown={formKeyPressed}>
                  <CardHeader className="text-center">
                    <BookHalf size={96} />
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (usernameFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <PersonCircle />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="fieldUsername"
                        placeholder="Username"
                        type="text"
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (passwordFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ShieldLock />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="fieldPassword"
                        placeholder="Password"
                        type="password"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      onClick={onLoginClicked}
                      size="lg"
                    >
                      Get Started
                    </Button>
                    <div className="pull-left">
                      <Link to="/signup">No account yet? Sign Up</Link>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
            <div>
              <p id="loginError" style={{ color: "white" }}>
                {loginError}
              </p>
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SigninPage;
