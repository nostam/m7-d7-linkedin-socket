import React from "react";
import { Col, Container, Row, Spinner, Alert, Card } from "react-bootstrap";
import Bio from "./BioCard";
import Experience from "./Experience";
import Feature from "./Featured";
import Sidebar from "./Sidebar";
import "../styles/Profile.css";
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
        console.log(profile);
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
            <h3 style={{ paddingTop: "20vh" }}>Loading profile...</h3>
            <Spinner
              animation="border"
              variant="info"
              style={{ marginTop: "20vh" }}
            />
          </Row>
        ) : Object.keys(this.state.profile).length !== 0 ? (
          <Row className="rowm">
            {/*<Col lg={3}></Col> */}
            <Col md={8} style={{ marginTop: "10vh" }}>
              <Card>
                <Card.Img
                  className="cardImg"
                  variant="top"
                  src="https://coverfiles.alphacoders.com/372/37275.jpg"
                  style={{ objectFit: "cover" }}
                  alt="placeholderr"
                />
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div style={{ marginTop: "-130px" }}>
                      <img
                        src={this.state.profile.image}
                        alt="placeholder"
                        height="160px"
                        width="160px"
                        style={{
                          borderRadius: "50%",
                          border: "4px solid white",
                          objectFit: "cover",
                        }}
                      ></img>
                    </div>
                  </div>

                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Bio bio={this.state.profile.bio} />
              <Feature />
              <Experience profile={this.state.profile} />
            </Col>
            <Col
              md={4}
              style={{ marginTop: "10vh" }}
              className="d-none d-md-block"
            >
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
