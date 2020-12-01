import React from "react";
// import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Button, Modal, Form } from "react-bootstrap";

class Edit extends React.Component {
  state = {
    showModal: false,
    id: this.props.id,
    experience: "",
  };
  url = "https://striveschool-api.herokuapp.com/api/profile/";
  fetchExp = async () => {
    try {
      if (this.props.expId !== null) {
        const response = await fetch(
          this.url + this.props.userId + "/experiences/" + this.props.expId,
          {
            method: "GET",
            headers: {
              Authorization: process.env.REACT_APP_TOKEN,
              ContentType: "application/json",
            },
          }
        );
        const data = response.json();
        if (response.ok) {
          this.setState({ experience: data });
          console.log(data, this.state.experience);
        }
      }
    } catch (error) {}
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.props.onHide}
      >
        <Modal.Header>
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
                value={this.state.experience.role}
                type="text"
                placeholder="Role"
                onChange={(e) => this.handle}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company * </Form.Label>
              <Form.Control
                required
                value={this.state.experience.company}
                type="text"
                placeholder="Company"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start date * </Form.Label>
              <Form.Control
                required
                value={this.state.experience.startDate}
                type="date"
                placeholder="Headline"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End date (empty if current) </Form.Label>
              <Form.Control
                value={this.state.experience.endDate}
                type="date"
                placeholder="Current Position"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description * </Form.Label>
              <Form.Control
                required
                value={this.state.experience.description}
                as="textarea"
                placeholder="Description"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Area * </Form.Label>
              <Form.Control
                required
                value={this.state.experience.area}
                type="text"
                placeholder="Area"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="rounded-pill py-1"
            variant="secondary"
            onClick={this.props.onClick}
          >
            Close
          </Button>
          <Button
            className="rounded-pill py-1"
            variant="primary"
            onClick={this.props.onClick}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Edit;
