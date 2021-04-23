import React from 'react';
import {Link} from 'react-router-dom';
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function Navigation() {
  const [navbarColor, setNavbarColor] = React.useState('navbar-transparent');
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor('');
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor('navbar-transparent');
      }
    };
    window.addEventListener('scroll', updateNavbarColor);
    return function cleanup() {
      window.removeEventListener('scroll', updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle('nav-open');
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={'fixed-top ' + navbarColor} color="info" expand="lg" title="Navigation">
        <Container>
          <UncontrolledDropdown className="button-dropdown">
            <DropdownToggle
              caret
              data-toggle="dropdown"
              href="#pablo"
              id="navbarDropdown"
              tag="p"
              onClick={e => e.preventDefault()}
            >
              <span className="button-bar"></span>
              <span className="button-bar"></span>
              <span className="button-bar"></span>
            </DropdownToggle>
            <DropdownMenu aria-labelledby="navbarDropdown">
              <DropdownItem header tag="a">
                Let&apos;s share
              </DropdownItem>
              <DropdownItem to="/send" tag={Link}>
                Send a book
              </DropdownItem>
              <DropdownItem to="/receive" tag={Link}>
                Register a book
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div className="navbar-translate">
            <NavbarBrand to="/home" id="navbar-brand" tag={Link}>
              BOOKCROSSING NEU
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              A book sharing platform.
            </UncontrolledTooltip>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/library" tag={Link}>
                  Library
                </NavLink>
              </NavItem>
              {localStorage.getItem('loggedin') ? (
                <NavItem>
                  <NavLink to="/profile" tag={Link}>
                    Profile
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem>
                  <Button
                    className="nav-link btn-neutral"
                    color="info"
                    to="/signin"
                    tag={Link}
                  >
                    <p style={{"color":"black"}}>SIGN IN</p>
                  </Button>
                </NavItem>
              )}
              {localStorage.getItem('loggedin') && (
                <NavItem>
                  <NavLink
                    tag={Link}
                    to="/home"
                    onClick={() => {
                      localStorage.removeItem('loggedin');
                    }}
                    style={{"color":"black"}}
                  >
                    SIGN OUT
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink
                  href="https://github.com/Yuchen112211/bookcrossing"
                  target="_blank"
                  id="github-tooltip"
                  tag="a"
                >
                  <i className="fab fa-github"></i>.
                  <p className="d-lg-none d-xl-none">Github</p>
                </NavLink>
                <UncontrolledTooltip target="#github-tooltip">
                  Checkout our code
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
