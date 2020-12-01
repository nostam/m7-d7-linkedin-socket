import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Button, Modal, Form } from "react-bootstrap";

class Edit extends React.Component {
  state ={ 
    id: this.props._id,
    selected: ""
  }

  componentDidMount() {
    fetch("https://striveschool-api.herokuapp.com/api/profile/5fc4ee77ed266800170ea3e7/experiences", {
      method: "GET",
      headers: new Headers({
        Authorization: process.env.REACT_APP_TOKEN,
        ContentType: "application/json",
      }),
    })
      .then((response) => response.json())
      .then((experience) => {
        console.log(experience);
        let ids = experience.map((exp)=> exp._id)
        let selected = ids.indexOf(this.state._id)
        this.setState({experience : experience})
        this.setState({selected: selected}, console.log(this.state.selected))
      });
  }
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
              <Form.Control required value={this.props.role} type="text" placeholder="Role" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company  * </Form.Label>
              <Form.Control required value={this.props.comp} type="text" placeholder="Company" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start date  * </Form.Label>
              <Form.Control required value={this.props.startDate} type="date" placeholder="Headline" />
            </Form.Group>
            <Form.Group>
              <Form.Label>End date (empty if current)  </Form.Label>
              <Form.Control value={this.props.endDate} type="date" placeholder="Current Position" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description * </Form.Label>
              <Form.Control required value={this.props.description} as="textarea" placeholder="Description" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Area * </Form.Label>
              <Form.Control required value={this.props.area} type="text" placeholder="Area" />
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
