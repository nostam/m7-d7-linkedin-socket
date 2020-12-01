import React from "react";
import Edit from "./EditExp";
import Add from "./AddExp"
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Button, Card, Col, Row, Modal } from "react-bootstrap";

class Experience extends React.Component {
  state = {
    openEdit: false,
    openAdd: false,
  };

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
        let exp = { ...experience };
      });
  }

  toggleAddModal = () => {
    this.setState({ openAdd: !this.state.openAdd });
  };
  toggleEditModal = () => {
    this.setState({ openEdit: !this.state.openEdit });
  };
  onOk = () => {
    this.setState({ clickBook: false, open: false });
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
              <Col md={1}>
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
                <Button variant="light" onClick={this.toggleEditModal}>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-pencil-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                    />
                  </svg>
                </Button>
              </Col>
            </Row>
            <Edit />
            <ul>
              <li style={{ listStyleType: `none` }}>
                <div class="roleExp">Istruttore</div>
              </li>
              <li style={{ listStyleType: `none` }}>
                <div class="workplaceExp">S.G. Rubattino Part-time</div>
              </li>
              <li style={{ listStyleType: `none` }}>
                <div class="timeExp">2017 – presente • 3 anni 4 mesi</div>
              </li>
              <li style={{ listStyleType: `none` }}>
                <div class="cityExp">Genova, Liguria, Italia</div>
              </li>
            </ul>
          </Card.Body>
        </Card>
        <Edit
          open={this.state.openEdit}
          onHide={this.toggleEditModal}
          onClick={this.onOk}
        />
        <Add 
        open={this.state.openAdd}
        onHide={this.toggleAddModal}
        onClick={this.onOk}/>
      </>
    );
  }
}
export default Experience;
