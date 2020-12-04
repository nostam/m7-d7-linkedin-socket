import FooterLogo from "../footer_logo.svg";

import "../styles/Welcome.css";
import React, { Component } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
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
                  height="38"
                />
              </Navbar.Brand>
              <button>Join with resume</button>
              <span>|</span>
              <button>Join now</button>
              <Link to="/login">
                <button className="btnSign">Sign in</button>
              </Link>
            </Navbar>
            <div className="sphereBox">
              <Login />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
