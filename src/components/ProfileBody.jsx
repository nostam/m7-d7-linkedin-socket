import React from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Bio from "./BioCard";
import Header from "./Jumbotron";
import Sidebar from "./Sidebar";

class Body extends React.Component {
  state = {
    profile: {},
    showAlert: null,
    success: false,
    loading: true,
  };

  componentDidMount() {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      method: "GET",
      headers: new Headers({
        Authorization: process.env.REACT_APP_TOKEN,
        ContentType: "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((info) => {
        console.log("fetched profile", info);
        let profile = { ...info };
        this.setState({ profile: profile, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <Container>
        {this.state.loading ? (
          <Row className="d-flex justify-content-center my-5">
            <h3>Loading profile...</h3>
            <Spinner animation="border" variant="secondary"></Spinner>
          </Row>
        ) : (
          <Row>
            <Col xs={12} md={8}>
              <Header
                name={
                  this.state.profile.name + " " + this.state.profile.surname
                }
                desc={this.state.profile.title}
                src={this.state.profile.image}
                loc={this.state.profile.area}
              />
              <Bio bio={this.state.profile.bio} />
            </Col>
            <Col>
              <Sidebar />
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}
export default Body;
