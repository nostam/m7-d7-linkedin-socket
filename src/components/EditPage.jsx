import React from "react"
import { Image, Row, Col, InputGroup, FormControl, Container, Form,Button, Modal } from "react-bootstrap"
import "../styles/EditPage.css"





class EditPage extends React.Component {
    state = {
        profile : {
        },
        showModal: false
    }

    async componentDidMount() {
        try{
                        const pFetch = await fetch ("https://striveschool-api.herokuapp.com/api/profile/me",{
                            headers:{
                                Authorization: process.env.REACT_APP_TOKEN
                            }
                        })
                        const pResponse = await pFetch.json()
                        console.log(pResponse)
                        this.setState({profile : pResponse})
                        console.log(this.state.profile)
        }
        catch(error){
            console.log(error)
        }

    }
    onChangeHandler = (e) => {
        this.setState({
          profile: {
            ...this.state.profile,
            [e.target.id]: e.currentTarget.value,
          },
        });
      };

      editPage = async () => {
        const url = "https://striveschool-api.herokuapp.com/api/profile/"
        try {
          const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(this.state.profile),
            headers: {
              "Content-Type": "application/json",
              Authorization:
                process.env.REACT_APP_TOKEN
            },
          });
          console.log(response);
          if (response.ok) {
            this.setState({ showModal: false });
            //this.props.handleAlert(true, true);
            //this.props.refetch();
          } else {
            this.setState({ showModal: false });
            //this.props.handleAlert(false, true);
          }
        } catch (e) {
          console.log(e);
        }
      };

    render() {
        return (
            <>
            <Button
            variant="primary"
            onClick={() => {
              this.setState({ showModal: true });
              //this.props.handleAlert(undefined, false);
            }}
          >
          </Button>
                <Modal             show={this.state.showModal}
            onHide={() => this.setState({ showModal: false })}>
                <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Image src={this.state.profile.image} roundedCircle className="editImage"/>
                    <Form>
                        <Row className="mt-4">
                            <Col>
                                <Form.Group>
                                    <Form.Label>First Name*</Form.Label>
                                    <Form.Control type="text" value={this.state.profile.name} id="name" onChange={(e) => this.onChangeHandler(e)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Last Name*</Form.Label>
                                    <Form.Control type="text" value={this.state.profile.surname} id="surname" onChange={(e) => this.onChangeHandler(e)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr />
                        <Form.Group>
                            <Form.Label>Headline</Form.Label>
                            <Form.Control as="textarea" rows={2} value={this.state.profile.bio} id ="bio" onChange={(e) => this.onChangeHandler(e)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Current Position</Form.Label>
                            <Form.Control type="text" value={this.state.profile.title} id="title" onChange={(e) => this.onChangeHandler(e)}/>
                        </Form.Group>
                        <hr />
                        <Form.Group>
                            <Form.Label>Country/Region</Form.Label>
                            <Form.Control type="text" value={this.state.profile.area} id="area" onChange={(e) => this.onChangeHandler(e)}/>
                        </Form.Group>
                    </Form>
                    <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary" onClick={() => this.editPage()}>
                Submit
              </Button>
            </Modal.Footer>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default EditPage