import React from "react";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import Bio from "./BioCard";
import Experience from "./Experience";
import Feature from "./Featured";
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
  searchProfile = (id) => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/" + id, {
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
    this.props.match.params.id &&
      this.searchProfile(this.props.match.params.id);
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.searchProfile(this.props.match.params.id);
    }
  };
  render() {
    return (
      <div className="mainBody">
        {this.state.err && <Alert variant="danger">{this.state.errMsg}</Alert>}
        {this.state.loading && this.state.err !== true ? (
          <Row className="d-flex justify-content-center my-5">
            <h3>Loading profile...</h3>
            <Spinner animation="border" variant="info" />
          </Row>
        ) : Object.keys(this.state.profile).length !== 0 ? (
          <Row>
            <Col xs={12} lg={8} md={12}>
              <Header
                name={
                  this.state.profile.name + " " + this.state.profile.surname
                }
                refetch={() => this.searchProfile(this.props.match.params.id)}
                desc={this.state.profile.title}
                src={this.state.profile.image}
                loc={this.state.profile.area}
                profile={this.state.profile}
              />
              <Bio bio={this.state.profile.bio} />
              <Feature/>
              <Experience profile={this.state.profile} />
            </Col>
            <Col  lg={4}
              style={{ marginTop: "5.3vw" }}
              className="d-none d-lg-block">
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
      </div>
    );
  }
}
export default Body;
