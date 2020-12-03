import React from "react";
import EditPage from "./EditPage";
import { Jumbotron, Dropdown, Button, Card, Row, Col } from "react-bootstrap";
import "../App.css";
import Job from "../assets/job.png";
class Header extends React.Component {
  render() {
    return (
      <Jumbotron
        className="header"
        style={{ position: "relative", paddingBottom: 0, marginBottom: 0 }}
      >
        <div className="coverpic"></div>
        {/*Edit, more and add section button*/}
        <Row
          noGutters
          style={{
            position: `absolute`,
            top: `21vh`,
            left: `55%`,
            display: `flex`,
          }}
        >
          <Col md={7} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Dropdown>
              <Dropdown.Toggle
                className="rounded-pill"
                id="dropdown-basic"
                style={{
                  backgroundColor: "#0A66CE",
                  height: "3.1vh",
                  fontWeight: 600,
                  borderStyle: "none",
                  paddingBottom: "1.5vw",
                }}
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
          <Col md={3} style={{ marginLeft: `.5vw` }}>
            <Button
              style={{
                height: "2.8vh",
                paddingBottom: "1.5vw",
              }}
              className="rounded-pill"
              variant="outline-secondary"
            >
              More...
            </Button>
          </Col>
          <Col md={1} style={{ marginLeft: ".7vw" }}>
            <EditPage
              profile={this.props.profile}
              refetch={this.props.refetch}
            />
          </Col>
        </Row>
        {/*propic and headers*/}
        <img src={this.props.profile.image} className="propic" alt="profile" />
        <div style={{ position: "absolute", top: "40%", width: "100%" }}>
          <div id="headerName">{this.props.name}</div>
          <div id="headerDescription">{this.props.desc}</div>
          <Row className="d-flex" noGutters id="headerLinkLoc">
            <div id="headerLoc"> {this.props.loc}</div>

            <div id="headerLink" className="hoverBlue">
              ∙&nbsp;&nbsp;24 connections&nbsp;&nbsp;∙&nbsp;&nbsp;Contact Info
            </div>
          </Row>
        </div>
        <img src={Job} className="job" />
        <div className="jobdec hoverBlue" style={{ whiteSpace: "nowrap" }}>
          {this.props.desc}
        </div>
        <Card
          style={{
            width: "91%",
            position: "absolute",
            top: "35.5vh",
            left: "4",
            borderRadius: ".5vw",
          }}
        >
          <Card.Header
            className="hoverBlue"
            style={{ fontSize: "11pt", borderRadius: ".5vw" }}
          >
            <strong>Available for work</strong> <br />
            {this.props.desc} roles <br />
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
