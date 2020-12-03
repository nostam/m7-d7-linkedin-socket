import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Card, Col, Row } from "react-bootstrap";
import EditPage from "./EditPage"
import '../styles/Profile.css'

class Bio extends React.Component {
  render() {
    return (
      <Card style={{ borderRadius: ".5vw", marginTop: ".8vw", width: '46vw', left: '-3.5vw' }}>
        <Card.Body>
          <Row className='d-flex justify-content-between ml-1'>
            
            <div className="info">About</div>
            
            <EditPage
              profile={this.props.profile}
              refetch={this.props.refetch}
              color='#0A66CE'
            />
            
          </Row>
          
          
          <div class="infobody">{this.props.bio}</div>
        </Card.Body>
      </Card>
    );
  }
}
export default Bio;
