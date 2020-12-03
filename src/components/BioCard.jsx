import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Card, Col, Row } from "react-bootstrap";
import EditPage from "./EditPage";

class Bio extends React.Component {
  render() {
    return (
      <Card style={{ borderRadius: ".5vw", marginTop: ".8vw" }}>
        <Card.Body>
          <Row>
            <Col md={10} lg={11}>
              <div className="info">About</div>
            </Col>
            <Col
              md={2}
              lg={1}
              className="pencil"
              style={{ paddingRight: "1vw" }}
            >
              <EditPage
                profile={this.props.profile}
                refetch={this.props.refetch}
                color="#0A66CE"
                backgroundColor="transparent"
              />
            </Col>
          </Row>

          <div class="infobody">{this.props.bio}</div>
        </Card.Body>
      </Card>
    );
  }
}
export default Bio;
