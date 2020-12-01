import React from "react";
import EditPage from "./EditPage";
import { Jumbotron, Dropdown, Button, Card, Row, Col } from "react-bootstrap";
import "../App.css";
class Header extends React.Component {
  render() {
    return (
      <Jumbotron className="header" style={{ position: "relative" }}>
        <div className="coverpic"></div>
        {/*Edit, more and add section button*/}
        <Row
          style={{
            position: `absolute`,
            top: `32%`,
            left: `55%`,
            display: `flex`,
          }}
        >
          <Col md={7} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Dropdown>
              <Dropdown.Toggle
                className="rounded-pill"
                id="dropdown-basic"
                style={{ backgroundColor: "#004182", fontWeight: 600, borderStyle : "none" }}
              >
                Add profile section
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Presentation</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Info</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Highlights</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Education</Dropdown.Item>
                <Dropdown.Item href="#/action-6">Skills</Dropdown.Item>
                <Dropdown.Item href="#/action-7">Achievements</Dropdown.Item>
                <Dropdown.Item href="#/action-8">More info</Dropdown.Item>
                <Dropdown.Item href="#/action-9">Languages</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={3} style={{ paddingLeft: `0vw` }}>
            <Button className="rounded-pill" variant="outline-secondary">
              More...
            </Button>
          </Col>
          <Col md={1}>
            <EditPage profile={this.props.profile} />
          </Col>
        </Row>
        {/*propic and headers*/}
        <img src={this.props.src} className="propic" alt="profile" />
        <div style={{ position: "absolute", top: "40%", width: "100%" }}>
          <div id="headerName">{this.props.name}</div>
          <div id="headerDescription">{this.props.desc}</div>
          <Row
            className="d-flex"
            noGutters
            style={{ position: `relative`, top: `4.5vw` }}
          >
            <Col md={5}>
              <div id="headerLoc"> {this.props.loc}</div>
            </Col>
            <Col md={1}>
              <div id="headerLink">• 24 links</div>
            </Col>
            <Col md={2}>
              <div id="headerCI">• Contact Info</div>
            </Col>
          </Row>
        </div>
        <Card
          style={{
            width: "90%",
            position: "absolute",
            top: "34vh",
            left: "5%",
            borderRadius: "1vw",
          }}
        >
          <Card.Header
            style={{ textDecoration: "underline", fontSize: "11pt" }}
          >
            <strong>Available for work</strong> <br />
            {this.props.role} roles <br />
            <strong style={{ color: "#087BBA" }}>See details</strong>
          </Card.Header>
          <Card.Footer
            style={{
              backgroundColor: "white",
              fontSize: "11pt",
              height: `3vh`,
              padding: `.2vw`,
              paddingLeft: `1vw`,
            }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-eye-fill m-1"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
              />
            </svg>
            Recruiters only
          </Card.Footer>
        </Card>
      </Jumbotron>
    );
  }
}
export default Header;
