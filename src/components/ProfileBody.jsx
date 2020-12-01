import React from "react";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import Bio from "./BioCard";
import Experience from "./Experience";
import Header from "./Jumbotron";
import Sidebar from "./Sidebar";

class Body extends React.Component {
  state = {
    profile: {},
    showAlert: null,
    err: false,
    errType: null,
    errMsg: "",
    loading: true,
  };
  searchProfile = () => {
    fetch(
      "https://striveschool-api.herokuapp.com/api/profile/" +
        this.props.match.params.id,
      {
        method: "GET",
        headers: new Headers({
          Authorization: process.env.REACT_APP_TOKEN,
          ContentType: "application/json",
        }),
      }
    )
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
        this.setState({
          loading: false,
          err: true,
          errType: "danger",
          errMsg: error.messasge,
        });
      });
  };
  componentDidMount = async () => {
    this.props.match.params.id && this.searchProfile();
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.searchProfile();
    }
  };
  render() {
    return (
      <Container>
        {this.state.err && <Alert variant="danger">{this.state.errMsg}</Alert>}
        {this.state.loading && this.state.err !== true ? (
          <Row className="d-flex justify-content-center my-5">
            <h3>Loading profile...</h3>
            <Spinner animation="border" variant={this.state.errType}></Spinner>
          </Row>
        ) : Object.keys(this.state.profile).length !== 0 ? (
          <Row>
            <Col xs={12} md={8}>
              <Header
                name={
                  this.state.profile.name + " " + this.state.profile.surname
                }
                desc={this.state.profile.title}
                src={this.state.profile.image}
                loc={this.state.profile.area}
                profile={this.state.profile}
              />
              <Bio bio={this.state.profile.bio} />
            </Col>
            <Col>
              <Sidebar />
            </Col>
          </Row>
        ) : (
          this.setState({
            err: true,
            errType: "warning",
            errMsg: "We have encounter a problem, the profile is empty",
          })
        )}
      </Container>
    );
  }
}
export default Body;
