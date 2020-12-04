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
          Authorization: "Bearer " + localStorage.getItem("token"),
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
        <Card
          className="bio"
          style={{ borderRadius: ".5vw", marginTop: ".8vw" }}
        >
          <Card.Body>
            <Row className="d-flex justify-content-between ml-1">
              <div id="expTitle" className="info">
                Experience
              </div>

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
            </Row>
            {/* <Edit /> */}
            {this.state.experience.map((job, index) => {
              let startDateObj = new Date(job.startDate)
              let startyearO = startDateObj.getFullYear();
              let startmonthO = startDateObj.getMonth();
              let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
              let smonth = months[startmonthO]
              let endDateObj = new Date(job.endDate)
              let endtyearO = endDateObj.getFullYear();
              let endmonthO = endDateObj.getMonth();
              let emonth = months[endmonthO]
              if (!emonth || !endtyearO) {
                emonth='Current'
                endtyearO=" "
              }
              
              return (
                <>
                  <Row noGutters>
                    <Col md={1}>
                      <img
                        src={job.image ? job.image : Job}
                        style={{ width: "3vw" }}
                      />
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
                            {smonth + " " + startyearO}
                          </div>
                        </li>
                        <li className="expEntries">
                          <div class="timeExp">{emonth + " " + endtyearO}</div>
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
