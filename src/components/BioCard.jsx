import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import { Card } from "react-bootstrap"

class Bio extends React.Component {
    render() {
        return (
            <Card style={{ borderRadius: "1vw" }}>

                <Card.Body>
                    <div className="info">Information:</div>
                    <div class="infobody">{this.props.bio}</div>
                </Card.Body>
            </Card>
        )
    }
} export default Bio