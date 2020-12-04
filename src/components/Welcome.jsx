import "../styles/Welcome.css";
import React, { Component } from "react";

import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Badge,
  Navbar,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import FooterLogo from "../footer_logo.svg";
import "../styles/Login.css";
import Login from "./Login";
export default class Welcome extends Component {
  render() {
    return (
      <div>
        <div>
          <div className="boxNav">
            <Navbar
              style={{ width: "100% !important" }}
              className="d-flex justify-content-between"
            >
              <Navbar.Brand>
                <img
                  style={{ color: "#0A66C2" }}
                  alt="linkedin"
                  src={FooterLogo}
                  width="535"
                  height="33"
                />
              </Navbar.Brand>
              <button className="jnbtn">Join with resume</button>
              <p>|</p>
              <button className="jnbtn1">Join now</button>
              <Link to="/login">
                <button className="btnSign">Sign in</button>
              </Link>
            </Navbar>
            <Row>
              <Col xs={12} md={8}>
                <Container className="ml-5">
                  <div>
                    <Login dontShowLogo />
                  </div>
                </Container>
              </Col>
              <Col md={4}>
                <img
                  className="wlcmImg d-none d-md-block"
                  src="https://static-exp1.licdn.com/sc/h/3m4tgpbdz7gbldapvl63mrnxz"
                ></img>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
