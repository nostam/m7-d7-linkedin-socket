import React from "react";
import EditPage from "./EditPage";
import { Jumbotron, Dropdown, Button, Card, Row, Col } from "react-bootstrap";
import "../App.css";
import "../styles/Profile.css";
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
          <Row className="btns d-flex justify-content-center mx-auto">
            <Dropdown>
              <Dropdown.Toggle
                className="rounded-pill dropdownAdd"
                id="dropdown-basic"
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

            <Button
              style={{
                width: "4.5vw",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                height: "2.8vh",
                paddingBottom: "1.5vw",
                overflow: "hidden",
              }}
              className="rounded-pill moreBtn"
              variant="outline-secondary"
            >
              More...
            </Button>

            <EditPage
              profile={this.props.profile}
              refetch={this.props.refetch}
            />
          </Row>
          {/*propic and headers*/}
          <img src={this.props.src} className="propic" alt="profile" />

          <Row noGutters>
            <Col>
              <div
                id="headerName"
                className="d-flex justify-content-center my-2"
              >
                {this.props.name}
              </div>
            </Col>
          </Row>
          <Row className="d-flex" noGutters>
            <Col>
              <div
                id="headerDescription"
                className="d-flex justify-content-center"
              >
                {this.props.desc}
              </div>
            </Col>
            <Col className='d-flex justify-content-around'>
              <img src={Job} className="job d-flex" />

              <div className="jobdec hoverBlue d-flex justify-content-center">
                Student
              </div>
            </Col>
          </Row>
          <Row className="d-flex" noGutters id="headerLinkLoc">
            <div id="headerLoc" className="d-flex justify-content-center">
              {" "}
              {this.props.loc}
            </div>
            <div id="headerLink" className="hoverBlue">
              ∙&nbsp;&nbsp;24 connections&nbsp;&nbsp;∙&nbsp;&nbsp;Contact Info
            </div>
          </Row>
          {/* <Row
            className="d-flex opentowork"
            style={{
              width: "38vw",
              height: "6.8vw",
              position: "absolute",
              top: "36vh",
              borderRadius: ".5vw",
            }}
          >
            <Col xs={12}>
              <Card>
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
            </Col>
          </Row>
                */}
        </div>
      </Jumbotron>
    );
  }
}
export default Header;
