import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Button, Modal, Form } from "react-bootstrap";

class Edit extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.open}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit intro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Role * </Form.Label>
              <Form.Control required value="role" type="text" placeholder="First Name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company  * </Form.Label>
              <Form.Control required value="company" type="text" placeholder="Last Name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start date  * </Form.Label>
              <Form.Control required value="date1" type="date" placeholder="Headline" />
            </Form.Group>
            <Form.Group>
              <Form.Label>End date (empty if current)  </Form.Label>
              <Form.Control value="date2" type="date" placeholder="Current Position" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description * </Form.Label>
              <Form.Control required value="desc" as="textarea" placeholder="Description" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Area * </Form.Label>
              <Form.Control required value="area" type="text" placeholder="Area" />
            </Form.Group>
           
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClick}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.onClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Edit;
