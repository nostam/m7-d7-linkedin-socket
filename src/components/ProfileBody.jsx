import React from "react"
import { Col, Container, Jumbotron, Row } from "react-bootstrap"
import Bio from "./BioCard"
import Header from "./Jumbotron"
import Sidebar from "./Sidebar"

class Body extends React.Component {
    state = {
        profile: {
            name: "",
            surname: "",
            propic: "",
            title: "",
            area: "",
            bio: ""
        }
    }


    componentDidMount() {
        let response = fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
            method: "GET",
            headers: new Headers({
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM0ZWU3N2VkMjY2ODAwMTcwZWEzZTciLCJpYXQiOjE2MDY3NDE2MjQsImV4cCI6MTYwNzk1MTIyNH0.STnsxsacz4ygONashW1XfNqAZH-GP_QeIGilDbrfQ2w",
                ContentType: 'application/json'

            })
        }).then(response => response.json())
            .then(info => {
                console.log(info)
                let profile = { ...info }
                this.setState({ profile: profile }, console.log(this.state))
            })
    }
    render() {



        return (
            <Container >
                <Row>
                    <Col xs={12} md={8}>
                        <Header name={this.state.profile.name + " " + this.state.profile.surname}
                            desc={this.state.profile.title}
                            src={this.state.profile.image}
                            loc={this.state.profile.area} />
                        <Bio bio={this.state.profile.bio} />
                    </Col>
                    <Col> <Sidebar/> </Col>
                </Row>
            </Container>
        )
    }
} export default Body
