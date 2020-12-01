import React from "react"
import { Image, Row, Col, InputGroup, FormControl, Container, Form } from "react-bootstrap"





class EditPage extends React.Component {
    state = {
        profile : {
        }
    }

    async componentDidMount() {
        try{
                        const pFetch = await fetch ("https://striveschool-api.herokuapp.com/api/profile/me",{
                            headers:{
                                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM0ZWU3N2VkMjY2ODAwMTcwZWEzZTciLCJpYXQiOjE2MDY3NDE2MjQsImV4cCI6MTYwNzk1MTIyNH0.STnsxsacz4ygONashW1XfNqAZH-GP_QeIGilDbrfQ2w"
                            }
                        })
                        const pResponse = await pFetch.json()
                        console.log(pResponse)
                        this.setState({profile : pResponse})
        }
        catch(error){
            console.log(error)
        }

    }

    render() {
        return (
            <>
                <Container>
                    <Image src={this.state.profile.image} roundedCircle />
                    <Form>
                        <Row className="mt-4">
                            <Col>
                                <Form.Group>
                                    <Form.Label>First Name*</Form.Label>
                                    <Form.Control type="text" placeholder={this.state.profile.name} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Last Name*</Form.Label>
                                    <Form.Control type="text" placeholder={this.state.profile.surname} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr />
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Headline</Form.Label>
                            <Form.Control as="textarea" rows={2} placeholder={this.state.profile.bio}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Current Position</Form.Label>
                            <Form.Control type="text" placeholder={this.state.profile.title} />
                        </Form.Group>
                        <hr />
                        <Form.Group>
                            <Form.Label>Country/Region</Form.Label>
                            <Form.Control type="text" placeholder={this.state.profile.area} />
                        </Form.Group>
                    </Form>
                </Container>
            </>
        )
    }
}

export default EditPage