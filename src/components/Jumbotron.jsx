import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import { Button, Jumbotron, Row } from "react-bootstrap"
class Header extends React.Component {
    render() {
        return (
            <Jumbotron className="header">

                <div className="coverpic"></div>
                <img src={this.props.src} className="propic" />
                <Row style={{ position: "absolute", top: "40%" }}>
                    <h1>{this.props.name}</h1>
                    {"\n"}
                    <h2>{this.props.desc}</h2>
                    <h2 className="loc">Location ||</h2>
                    <h3 style={{ color: "blue" }}> Blue Link 1 || Blue Link 2</h3>

                    <p>
                        This is a simple hero unit, a simple jumbotron-style component for calling
                        extra attention to featured content or information.
                    </p></Row>
            </Jumbotron >
        )
    }
} export default Header
