import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Card, Col, Row } from "react-bootstrap";
import feat1 from "../assets/2.png";
import feat2 from "../assets/homepage.html.png";
import feat3 from "../assets/3.png";

class Feature extends React.Component {
  render() {
    return (
      <Card
        className="bio"
        style={{ borderRadius: ".5vw", marginTop: ".8vw", paddingRight: 0 }}
      >
        <Card.Body style={{ paddingRight: 0 }}>
          <div className="info">Featured</div>

          <Row noGutters style={{ overflow: "hidden", width: `100%` }}>
            <Col md={5} style={{ marginRight: ".4vw", marginLeft: ".2vw" }}>
              <Card style={{ borderRadius: ".5vw" }} className="featimg">
                <Card.Img variant="top" src={feat3} />
                <Card.Body style={{ padding: ".5vw" }} className="infobody">
                  <Card.Text style={{ fontWeight: "bold" }}>
                    Spotify Pastel Version
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={5} style={{ marginRight: ".4vw" }}>
              <Card style={{ borderRadius: ".5vw" }} className="featimg">
                <Card.Img
                  variant="top"
                  src={feat2}
                  style={{
                    objectFit: "cover",
                  }}
                />
                <Card.Body style={{ padding: ".5vw" }} className="infobody">
                  <Card.Text style={{ fontWeight: "bold" }}>
                    Netflix Clone
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col style={{ overflow: "hidden" }}>
              <Card md={2} style={{ borderRadius: ".5vw" }} className="featimg">
                <Card.Img variant="top" src={feat1} />
                <Card.Body style={{ padding: ".5vw" }} className="infobody">
                  <Card.Text style={{ fontWeight: "bold" }}>
                    Original App Design
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
export default Feature;
