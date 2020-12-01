import React from "react";
import Edit from "./EditExp";
import { Button, Card, Col, Row } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import "../styles/Experience.css";
class Experience extends React.Component {
  state = {
    showModal: false,
    experience: [],
    selectedId: null,
    method: null,
    exp: null,
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
  toggleModal = (job) => {
    job !== undefined
      ? this.setState({
          selectedId: job._id,
          exp: job,
          showModal: !this.state.showModal,
          method: "PUT",
        })
      : this.setState({ showModal: !this.state.showModal, method: "POST" });
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
                <Button variant="light" onClick={() => this.toggleModal()}>
                  <BsPlus />
                </Button>
              </Col>
            </Row>
            {/* <Edit /> */}
            {this.state.experience.map((job, index) => {
              return (
                <ul id={job._id} key={`exp${index}`}>
                  <Button variant="light" onClick={() => this.toggleModal(job)}>
                    <BiPencil />
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
          method={this.state.method}
          toggle={() => this.toggleModal()}
          exp={this.state.exp}
        />
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
