import React from "react";
// import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import "../App.css";
class Edit extends React.Component {
  state = {
    showModal: false,
    id: this.props.id,
    experience: "",
  };
  url = "https://striveschool-api.herokuapp.com/api/profile/";
  headers = {
    Authorization: process.env.REACT_APP_TOKEN,
    ContentType: "application/json",
  };
  fetchExp = async () => {
    try {
      if (this.props.expId !== null) {
        const response = await fetch(
          `${this.url}${this.props.userId}/experiences/${this.props.expId}`,
          {
            method: "GET",
            headers: this.headers,
          }
        );
        const data = await response.json();
        if (response.ok) {
          this.setState({ experience: data });
        }
      } else {
        throw "expId is invalid";
      }
    } catch (e) {
      console.log(e);
    }
  };
  onChangeHandler = (e) => {
    this.setState({
      experience: {
        ...this.state.experience,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };
  submitData = async (str) => {
    const url =
      str === "POST"
        ? `${this.url}${this.props.userId}/experiences`
        : `${this.url}${this.props.userId}/experiences/${this.props.expId}`;
    try {
      const response = await fetch(url, {
        method: str,
        body: JSON.stringify(this.state.experience),
        headers: this.headers,
      });
      if (response.status === 200) {
        console.log("submit succeed", this.state.experience);
        this.fetchExp();
      } else {
        console.log("submit failed");
      }
      this.setState({ showModal: false });
    } catch (e) {
      console.log(e);
    }
  };
  actionBtn = (str) => {
    str !== "DELETE"
      ? this.submitData(this.props.method)
      : this.submitData("DELETE");
  };
  componentDidMount = () => {
    // this.setState({ experience: this.props.exp });
    this.fetchExp();
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.props.toggle}
      >
        {this.state.experience && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.props.method === "PUT" ? "Edit" : "Add"} Experience
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Role * </Form.Label>
                  <Form.Control
                    required
                    id="role"
                    value={this.state.experience.role}
                    type="text"
                    size="sm"
                    placeholder="Role"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Company * </Form.Label>
                  <Form.Control
                    required
                    id="company"
                    value={this.state.experience.company}
                    type="text"
                    size="sm"
                    placeholder="Company"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Start date * </Form.Label>
                      <Form.Control
                        required
                        id="startDate"
                        value={this.state.experience.startDate}
                        type="date"
                        size="sm"
                        placeholder="Headline"
                        onChange={(e) => this.onChangeHandler(e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>End date (empty if current) </Form.Label>
                      <Form.Control
                        value={this.state.experience.endDate}
                        id="endDate"
                        type="date"
                        size="sm"
                        placeholder="Current Position"
                        onChange={(e) => this.onChangeHandler(e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Description * </Form.Label>
                  <Form.Control
                    required
                    value={this.state.experience.description}
                    id="description"
                    as="textarea"
                    size="sm"
                    placeholder="Description"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Area * </Form.Label>
                  <Form.Control
                    required
                    value={this.state.experience.area}
                    id="area"
                    type="text"
                    size="sm"
                    placeholder="Area"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {this.props.method === "PUT" && (
                <Button
                  className="rounded-pill py-1 mr-auto"
                  variant="danger"
                  onClick={() => this.actionBtn("DELETE")}
                >
                  DELETE
                </Button>
              )}
              <Button
                className="rounded-pill py-1"
                variant="secondary"
                onClick={this.props.toggle}
              >
                Close
              </Button>
              <Button
                className="rounded-pill py-1"
                variant="primary"
                onClick={() => this.actionBtn()}
              >
                {this.props.method === "PUT" ? "Save Changes" : "Submit"}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    );
  }
}
export default Edit;
