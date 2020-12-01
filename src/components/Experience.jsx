import React from "react";
import Edit from "./EditExp";
import Add from "./AddExp";
import { Button, Card, Col, Row } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import "../styles/Experience.css";
class Experience extends React.Component {
  state = {
    openEdit: false,
    openAdd: false,
    experience: [],
    selectedExperience: {},
  };
  searchExp = async (_id) => {
    await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${_id}/experiences`,
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
  componentDidMount = () => {
    this.searchExp(this.props.profile._id);
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.profile._id !== this.props.profile._id) {
      this.searchExp(this.props.profile._id);
    }
  };

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
                  <BsPlus />
                </Button>
              </Col>
            </Row>
            {/* <Edit /> */}
            {this.state.experience.map((jobs, index) => {
              return (
                <ul id={jobs._id} key={`exp${index}`}>
                  <Button
                    variant="light"
                    onClick={() => this.toggleEditModal(jobs)}
                  >
                    <BiPencil />
                  </Button>
                  <li className="expEntries">
                    <div class="roleExp">{jobs.role}</div>
                  </li>
                  <li className="expEntries">
                    <div class="workplaceExp">{jobs.company}</div>
                  </li>
                  <li className="expEntries">
                    <div class="timeExp">{jobs.startDate}</div>
                  </li>
                  <li className="expEntries">
                    <div class="timeExp">{jobs.endDate}</div>
                  </li>
                  <li className="expEntries">
                    <div class="cityExp">{jobs.area}</div>
                  </li>
                  <li className="expEntries">
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
