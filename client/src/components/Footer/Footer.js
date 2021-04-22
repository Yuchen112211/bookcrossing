/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';

// reactstrap components
import {Container} from 'reactstrap';
import {Github} from 'react-bootstrap-icons';

function Footer({bgColor}) {
  return (
    <footer className="footer" data-background-color={bgColor ? bgColor : null}>
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="https://github.com/Yuchen112211/bookcrossing"
                target="_blank"
              >
                <Github size={24} />.
              </a>
            </li>
          </ul>
        </nav>
        When you learn, teach, when you get, give. -<i>Maya Angelou</i>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Built by{' '}
          <a href="https://twitter.com/Yuchen52624402" target="_blank">
            Yuchen
          </a>{' '}
          &amp;{' '}
          <a href="https://www.instagram.com/zeft.t/" target="_blank">
            Zhi
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  bgColor: PropTypes.string,
};

export default Footer;
