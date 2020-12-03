import React from "react";
import Edit from "./EditExp";
import { Button, Card, Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BiPencil } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import "../styles/Experience.css";
import Job from "../assets/job.png";
import "../styles/Profile.css";

class Experience extends React.Component {
  state = {
    showModal: false,
    experience: [],
    selectedId: null,
    // method: null,
    exp: {},
  };

  searchExp = async () => {
    await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${this.props.profile._id}/experiences`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: localStorage.getItem("token"),
          ContentType: "application/json",
        }),
      }
    )
      .then((response) => response.json())
      .then((experience) => {
        this.setState({ experience: experience });
      });
  };
  componentDidMount = () => {
    this.searchExp();
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.profile._id !== this.props.profile._id) {
      this.searchExp();
    }
  };
  toggleModal = (job) => {
    job !== undefined
      ? this.setState({
          selectedId: job._id,
          showModal: !this.state.showModal,
        })
      : this.setState({
          selectedId: null,
          showModal: !this.state.showModal,
        });
  };

  render() {
    return (
      <>
        <Card style={{ borderRadius: ".5vw", marginTop: ".8vw" }}>
          <Card.Body>
            <Row>
              <Col md={10}>
                <div id="expTitle" className="info">
                  Experience
                </div>
              </Col>
              <Col md={2} style={{ position: "absolute", left: "90%" }}>
                <Button variant="white" onClick={() => this.toggleModal()}>
                  <IconContext.Provider
                    value={{
                      size: "30px",
                      className: "expIcons",
                      color: "#0A66CE",
                    }}
                  >
                    <BsPlus />
                  </IconContext.Provider>
                </Button>
              </Col>
            </Row>
            {/* <Edit /> */}
            {this.state.experience.map((job, index) => {
              let startyear = job.startDate.slice(0, 4);
              let startmonth = job.startDate.slice(5, 7);
              if (startmonth === "01") {
                startmonth = "Jan";
              } else if (startmonth === "02") {
                startmonth = "Feb";
              } else if (startmonth === "03") {
                startmonth = "Mar";
              } else if (startmonth === "04") {
                startmonth = "Apr";
              } else if (startmonth === "05") {
                startmonth = "May";
              } else if (startmonth === "06") {
                startmonth = "Jun";
              } else if (startmonth === "07") {
                startmonth = "Jul";
              } else if (startmonth === "08") {
                startmonth = "Aug";
              } else if (startmonth === "09") {
                startmonth = "Sep";
              } else if (startmonth === "10") {
                startmonth = "Oct";
              } else if (startmonth === "11") {
                startmonth = "Nov";
              } else if (startmonth === "12") {
                startmonth = "Dec";
              }

              let enddate = job.endDate.slice(0, 10);
              let endyear = job.endDate.slice(0, 4);
              let endmonth = job.endDate.slice(5, 7);
              if (endmonth === "01") {
                endmonth = "Jan";
              } else if (endmonth === "02") {
                endmonth = "Feb";
              } else if (endmonth === "03") {
                endmonth = "Mar";
              } else if (endmonth === "04") {
                endmonth = "Apr";
              } else if (endmonth === "05") {
                endmonth = "May";
              } else if (endmonth === "06") {
                endmonth = "Jun";
              } else if (endmonth === "07") {
                endmonth = "Jul";
              } else if (endmonth === "08") {
                endmonth = "Aug";
              } else if (endmonth === "09") {
                endmonth = "Sep";
              } else if (endmonth === "10") {
                endmonth = "Oct";
              } else if (endmonth === "11") {
                endmonth = "Nov";
              } else if (endmonth === "12") {
                endmonth = "Dec";
              }
              return (
                <>
                  <Row noGutters>
                    <Col md={1}>
                      <img src={Job} style={{ width: "3vw" }} />
                    </Col>
                    <Col>
                      <ul id={job._id} key={`exp${index}`} className="exp">
                        <Button
                          variant="white"
                          className="editBtnExp"
                          onClick={() => this.toggleModal(job)}
                        >
                          <IconContext.Provider
                            value={{
                              size: "1.6vw",
                              className: "expIcons",
                              color: "#0A66CE",
                            }}
                          >
                            <BiPencil />
                          </IconContext.Provider>
                        </Button>

                        <li className="expEntries">
                          <div class="roleExp">{job.role}</div>
                        </li>
                        <li className="expEntries">
                          <div class="workplaceExp">{job.company}</div>
                        </li>
                        <li className="expEntries">
                          <div class="timeExp">
                            {startmonth + " " + startyear}
                          </div>
                        </li>
                        <li className="expEntries">
                          <div class="timeExp">{endmonth + " " + endyear}</div>
                        </li>
                        <li className="expEntries">
                          <div class="cityExp">{job.area}</div>
                        </li>
                        <li className="expEntries">
                          <div class="descExp">{job.description}</div>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </>
              );
            })}
          </Card.Body>
        </Card>
        <Edit
          show={this.state.showModal}
          userId={this.props.profile._id}
          expId={this.state.selectedId}
          toggle={() => this.toggleModal()}
          refetch={() => this.searchExp()}
          color="#0A66CE"
        />
      </>
    );
  }
}
export default Experience;
