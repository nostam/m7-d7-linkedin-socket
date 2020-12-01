import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../App.css"
import { Jumbotron, Dropdown, Button, Card, Row, Col } from "react-bootstrap"
class Header extends React.Component {
    render() {
        return (
            <Jumbotron className="header" style={{ position: "relative" }}>
                <div className="coverpic"></div>
            {/*Edit, more and add section button*/}
            <Row style={{position: `absolute`, top: `32%`,left: `43%`, display: `flex`}} >
                <Col md={8} style={{paddingLeft: 0, paddingRight: 0}} >
                <Dropdown >
                    <Dropdown.Toggle className="rounded-pill" id="dropdown-basic" style={{ backgroundColor: "#087BBA", fontWeight: 600 }}>
                        Add a section to your profile
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Presentation</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Info</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">Highlights</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Education</Dropdown.Item>
                        <Dropdown.Item href="#/action-6">Skills</Dropdown.Item>
                        <Dropdown.Item href="#/action-7">Achievements</Dropdown.Item>
                        <Dropdown.Item href="#/action-8">More info</Dropdown.Item>
                        <Dropdown.Item href="#/action-9">Languages</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Col>
                <Col md={2} style={{paddingLeft: `0vw`}}>
                <Button className="rounded-pill" variant="outline-secondary">More...</Button>
                </Col>
                <Col md={2}> 
                <Button className="rounded-pill" variant="light" style={{backgroundColor: `white`, borderStyle: `none`}}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                </Button>
                </Col>
            </Row>
                {/*propic and headers*/}
                <img src={this.props.src} className="propic" />
                <div style={{ position: "absolute", top: "40%", width: "100%" }}>
                    <div id="headerName">{this.props.name}</div>
                    <div id="headerDescription">{this.props.desc}</div>
                    <Row className="d-flex" noGutters style={{position: `relative`, top: `7vw`}}>
                        <Col md={5}>
                        <div id="headerLoc"> {this.props.loc}</div>
                        </Col>
                        <Col md={1}>
                        <div id="headerLink" >• 24 links</div>
                        </Col>
                        <Col md={2} >
                        <div id="headerCI">• Contact Info</div>
                        </Col>
                    </Row>
                    

                </div>
                <Card style={{ width: "90%", position: "absolute", top: "35vh", left: "5%", borderRadius: "1vw" }}>
                    <Card.Header style={{ textDecoration: "underline", fontSize: "11pt" }}><strong>Available for work</strong> <br />
                    Web developer and CEO roles <br />
                        <strong style={{ color: "#087BBA" }}>See details</strong>
                    </Card.Header>
                    <Card.Footer style={{ backgroundColor: "white", fontSize: "11pt", height: `3vh`, padding: `.2vw`, paddingLeft: `1vw` }}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye-fill m-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                    Recruiters only
                    </Card.Footer>
                </Card>
            </Jumbotron >
        )
    }
} export default Header
