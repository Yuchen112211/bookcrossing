/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import { Github } from "react-bootstrap-icons";

function Footer(props) {
  return (
    <footer
      className="footer"
      data-background-color={props.bgColor ? props.bgColor : null}
    >
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="https://github.com/Yuchen112211/bookcrossing"
                target="_blank"
              >
                <Github size={24} />
              </a>
            </li>
          </ul>
        </nav>
        When you learn, teach, when you get, give. -<i>Maya Angelou</i>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Built by{" "}
          <a href="" target="_blank">
            Yuchen
          </a>{" "}
          &amp;{" "}
          <a href="https://www.instagram.com/zeft.t/" target="_blank">
            Zhi
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
