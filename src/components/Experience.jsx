import React from "react";
import Edit from "./EditExp";
import { Button, Card, Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BiPencil } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import "../styles/Experience.css";
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
          Authorization: process.env.REACT_APP_TOKEN,
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
    console.log("exp", this.props, this.state);
    job !== undefined
      ? this.setState({
          selectedId: job._id,
          exp: job,
          showModal: !this.state.showModal,
        })
      : this.setState({
          selectedId: null,
          exp: { empty: true },
          showModal: !this.state.showModal,
        });
  };

  render() {
    return (
      <>
        <Card style={{ borderRadius: "1vw", marginTop: `2vw` }}>
          <Card.Body>
            <Row>
              <Col md={11}>
                <div id="expTitle" className="info">
                  Experience
                </div>
              </Col>
              <Col>
                <Button variant="white" onClick={() => this.toggleModal()}>
                  <IconContext.Provider
                    value={{
                      size: "24px",
                      className: "expIcons",
                    }}
                  >
                    <BsPlus />
                  </IconContext.Provider>
                </Button>
              </Col>
            </Row>
            {/* <Edit /> */}
            {this.state.experience.map((job, index) => {
              return (
                <ul id={job._id} key={`exp${index}`}>
                  <Button variant="white" onClick={() => this.toggleModal(job)}>
                    <IconContext.Provider
                      value={{
                        size: "24px",
                        className: "expIcons",
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
                    <div class="timeExp">{job.startDate}</div>
                  </li>
                  <li className="expEntries">
                    <div class="timeExp">{job.endDate}</div>
                  </li>
                  <li className="expEntries">
                    <div class="cityExp">{job.area}</div>
                  </li>
                  <li className="expEntries">
                    <div class="cityExp">{job.description}</div>
                  </li>
                </ul>
              );
            })}
          </Card.Body>
        </Card>
        <Edit
          show={this.state.showModal}
          userId={this.props.profile._id}
          expId={this.state.selectedId}
          toggle={() => this.toggleModal()}
          exp={this.state.exp}
          refetch={() => this.searchExp()}
        />
      </>
    );
  }
}
export default Experience;
