import React from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';

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
  Modal,
} from 'reactstrap';
import {
  BookHalf,
  CreditCard2Front,
  Fonts,
  Mailbox,
  PersonCircle,
  ShieldLock,
} from 'react-bootstrap-icons';

// core components
import Navigation from 'components/Navigation/Navigation.js';
import Footer from 'components/Footer/Footer.js';

function SignupPage() {
  const [usernameFocus, setUsernameFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [addressFocus, setAddressFocus] = React.useState(false);
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);

  const [errMsg, setErrMsg] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const {register, handleSubmit, errors} = useForm();

  const onSubmit = data => {
    const signupUrl = '/api/users/signup';

    const body = {
      username: document.getElementById('fieldUsername').value,
      password: document.getElementById('fieldPassword').value,
      address: document.getElementById('fieldMailingAddress').value,
      firstname: document.getElementById('fieldFirstName').value,
      lastname: document.getElementById('fieldLastName').value,
    };
    
    if (!body.username || !body.password || !body.address) {
      return ; 
    }

    fetch(signupUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(function (response) {
        if (response.status === 200) {
          setModalOpen(true);
        }
        return response.json();
      })
      .then(function (data) {
        if (data.errors) {
          setErrMsg(data.errors);
        }
      })
      .catch(function (error) {
        const msg = 'Unknown issue, please try again.';
        setErrMsg(msg);
      });
  };

  React.useEffect(() => {
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

  const keyPressed = (event) => {
    if (event.code == "Enter") {
      handleSubmit(onSubmit);
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
              'url(' + require('assets/img/login.jpg').default + ')',
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form
                  action=""
                  method="post"
                  onSubmit={handleSubmit(onSubmit)}
                  className={'register-form'}
                  onKeyDown={keyPressed}
                >
                  <CardHeader className="text-center">
                    <BookHalf size={96} />
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        'no-border input-lg' +
                        (usernameFocus ? ' input-group-focus' : '')
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
                        pattern="[A-Za-z0-9]{6,}"
                        ref={register}
                        required
                        title="Username should contains at least 6 characters with only letters and numbers"
                      >
                        {'>'}
                      </Input>
                      {errors.username && (
                        <p id="usernameError" style={{color: 'red'}}>
                          {errors.username.message}
                        </p>
                      )}
                    </InputGroup>
                    <InputGroup
                      className={
                        'no-border input-lg' +
                        (passwordFocus ? ' input-group-focus' : '')
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
                        pattern=".{8,}"
                        ref={register}
                        required
                        title="Password need to contain at least eight characters"
                      ></Input>
                      {errors.password && (
                        <p id="passwordError" style={{color: 'red'}}>
                          {errors.password.message}
                        </p>
                      )}
                    </InputGroup>
                    <InputGroup
                      className={
                        'no-border input-lg' +
                        (addressFocus ? ' input-group-focus' : '')
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Mailbox />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="fieldMailingAddress"
                        placeholder="Mailing Address"
                        type="text"
                        onFocus={() => setAddressFocus(true)}
                        onBlur={() => setAddressFocus(false)}
                        ref={register}
                        required
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        'no-border input-lg' +
                        (firstFocus ? ' input-group-focus' : '')
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <CreditCard2Front />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="fieldFirstName"
                        placeholder="First Name"
                        type="text"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                        ref={register}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        'no-border input-lg' +
                        (lastFocus ? ' input-group-focus' : '')
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Fonts />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="fieldLastName"
                        placeholder="Last Name"
                        type="text"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                        ref={register}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      type={'submit'}
                      size="lg"
                    >
                      Sign me up!
                    </Button>
                    <div className="pull-left">
                      <Link to="/signin">Already has an account? Sign In</Link>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
            <p id="duplicatesError" style={{color: 'red'}}>
              {errMsg}
            </p>
          </Container>
        </div>
        <Modal
          isOpen={modalOpen}
          modalClassName="bd-example-modal-sm"
          toggle={() => setModalOpen(false)}
        >
          <div className="modal-header">
            <h3 className="modal-title" id="mySmallModalLabel">
              Congratulation!
            </h3>
          </div>
          <div className="modal-body">You have successfully signed up!</div>
          <div className="modal-footer">
            <Button
              type="button"
              className="btn"
              color="info"
              to="/signin"
              tag={Link}
            >
              Sign in
            </Button>
          </div>
        </Modal>
        <Footer />
      </div>
    </>
  );
}

export default SignupPage;
