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
        <div className="wrapper">
          <Row
            style={{
              position: `absolute`,
              top: `10vw`,
              right: `3.5vw`,
              width: '18vw'
            }}
          >
            <Col sm={12} lg={7} xl={7} style={{paddingLeft: '.5vw', paddingRight: '.5vw'}} >
              <Dropdown>
                <Dropdown.Toggle
                  className="rounded-pill"
                  id="dropdown-basic"
                  style={{
                    width: '10vw',
                    overflow: "hidden",
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
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
            <Col sm={12} lg={3} xl={3} >
              <Button
                style={{
                  width: '4.5vw',
                  overflow: "hidden",
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  height: "2.8vh",
                  paddingBottom: "1.5vw",
                  overflow: "hidden"
                }}
                className="rounded-pill"
                variant="outline-secondary"
              >
                More...
              </Button>
            </Col>
            <Col sm={12} lg={2} xl={2} >
              <EditPage
                profile={this.props.profile}
                refetch={this.props.refetch}
              />
            </Col>
          </Row>
          {/*propic and headers*/}
          <img src={this.props.src} className="propic" alt="profile" />

          <Row className="d-flex" noGutters>
            <Col>
              <div id="headerName">{this.props.name}</div>
            </Col>
            <Col>
              <img src={Job} className="job" />
              <div className="jobdec hoverBlue">{this.props.desc}</div>
            </Col>
          </Row>
          <Row className="d-flex" noGutters>
            <Col>
              <div id="headerDescription">{this.props.desc}</div>
            </Col>
          </Row>
          <Row className="d-flex" noGutters id="headerLinkLoc">
            <div id="headerLoc"> {this.props.loc}</div>
            <div id="headerLink" className="hoverBlue">
              ∙&nbsp;&nbsp;24 connections&nbsp;&nbsp;∙&nbsp;&nbsp;Contact Info
            </div>
          </Row>

          <Card
            style={{
              width: "38vw",
              height: "6.8vw",
              position: "absolute",
              top: "36vh",
              borderRadius: ".5vw",
            }}
          >
            <Card.Header
              className="hoverBlue"
              style={{ fontSize: "11pt", borderRadius: ".5vw" }}
            >
              <strong>Open to work</strong> <br />
              {this.props.desc} roles <br />
              <strong style={{ color: "#087BBA" }}>See all details</strong>
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
              Only recruiters
            </Card.Footer>
          </Card>
        </div>
      </Jumbotron>
    );
  }
}
export default Header;
