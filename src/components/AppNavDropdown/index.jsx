import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import "./styles.css";
export default class AppNavDropdown extends Component {
  render() {
    return (
      <div className="AppNavDropdownMenu">
        <div className="d-flex flex-row flex-nowrap align-items-center">
          <img
            src={this.props.me.image}
            className="AppNavDropdownAvatar"
            alt="placeholder"
          ></img>
          <Col className="ml-2 m-0">
            <Row>
              <b>
                {this.props.me.name} {this.props.me.surname}
              </b>
            </Row>
            <Row>{this.props.me.bio}</Row>
          </Col>
        </div>
        <Link className="w-100 align-items-center" to="/user/me">
          <Button
            variant="outline-primary"
            className="rounded-pill navDropdownBtn mx-3 my-2"
            size="sm"
          >
            View profile
          </Button>
        </Link>
        <hr style={{ margin: "0px" }} />
        <b style={{ paddingLeft: "8px ", margin: "0px 2px 0px 0px" }}>
          Account
        </b>
        <p
          style={{
            paddingLeft: "8px",
            margin: "0px 130px 0px 0px",
            color: "#788fa5",
          }}
        >
          Upgrade my plane
        </p>
        <p
          style={{
            paddingLeft: "8px",
            margin: "0px 2px 0px 0px",
            color: "#788fa5",
          }}
        >
          Settings and privacy
        </p>
        <p
          style={{
            paddingLeft: "8px",
            margin: "0px 2px 0px 0px",
            color: "#788fa5",
          }}
        >
          Help
        </p>
        <p
          style={{
            paddingLeft: "8px",
            margin: "0px 2px 0px 0px",
            color: "#788fa5",
          }}
        >
          Language
        </p>
        <hr />
        <b style={{ paddingLeft: "8px ", margin: "0px 2px 0px 0px" }}>Manage</b>
        <p
          style={{
            paddingLeft: "8px",
            margin: "0px 2px 0px 0px",
            color: "#788fa5",
          }}
        >
          Posts & Activity
        </p>
        <p
          style={{
            paddingLeft: "8px",
            margin: "0px 2px 0px 0px",
            color: "#788fa5",
          }}
        >
          Job Posting Account
        </p>
        <hr style={{ margin: "0px" }} />
        {/* <Link className="navLinkCol flex-column" to="/login">
            style=
            {{
              paddingLeft: "29px",
              margin: "0px 2px 0px 0px",
              color: "#788fa5",
            }}<p>
            Sign Out
          </p>
        </Link> */}
      </div>
    );
  }
}
