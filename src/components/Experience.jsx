import React from "react";
import Edit from "./EditExp";
import Add from "./AddExp";
import { Button, Card, Col, Row } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
class Experience extends React.Component {
  state = {
    openEdit: false,
    openAdd: false,
    experience: [],
    selectedExperience: {},
  };
  searchExp = () => {
    fetch(
      "https://striveschool-api.herokuapp.com/api/profile/" +
        this.props.match.params.id +
        "/experiences",
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
        this.setState({ experience: experience }, () =>
          console.log("state exp", this.state.experience)
        );
      });
  };
  componentDidMount() {
    console.log(this.state.experience, this.props);
    // this.searchExp();
  }

  toggleAddModal = () => {
    this.setState({ openAdd: !this.state.openAdd });
  };
  toggleEditModal = (item) => {
    this.setState(
      { selectedExperience: item },
      console.log(this.state.selectedExperience)
    );
    this.setState(
      { openEdit: !this.state.openEdit },
      console.log(this.state.openEdit)
    );
  };
  onOk = () => {
    this.setState({ openEdit: false, openAdd: false });
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
                <Button variant="light" onClick={this.toggleAddModal}>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-plus"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                    />
                  </svg>{" "}
                </Button>
              </Col>
            </Row>
            <Edit />
            {this.state.experience.map((jobs, index) => {
              return (
                <ul id={jobs._id} key={`exp${index}`}>
                  <Button
                    variant="light"
                    onClick={() => this.toggleEditModal(jobs)}
                  >
                    <BiPencil />
                  </Button>
                  <li style={{ listStyleType: `none` }}>
                    <div class="roleExp">{jobs.role}</div>
                  </li>
                  <li style={{ listStyleType: `none` }}>
                    <div class="workplaceExp">{jobs.company}</div>
                  </li>
                  <li style={{ listStyleType: `none` }}>
                    <div class="timeExp">{jobs.startDate}</div>
                  </li>
                  <li style={{ listStyleType: `none` }}>
                    <div class="timeExp">{jobs.endDate}</div>
                  </li>
                  <li style={{ listStyleType: `none` }}>
                    <div class="cityExp">{jobs.area}</div>
                  </li>
                  <li style={{ listStyleType: `none` }}>
                    <div class="cityExp">{jobs.description}</div>
                  </li>
                </ul>
              );
            })}
          </Card.Body>
        </Card>
        {/* <Edit
          open={this.state.openEdit}
          onHide={this.toggleEditModal}
          onClick={this.onOk}
          id={this.state.selected}
          experience={this.state.selectedExperience}
        /> */}
        {/* <Add
          open={this.state.openAdd}
          onHide={this.toggleAddModal}
          onClick={this.onOk}
        /> */}
      </>
    );
  }
}
export default Experience;
