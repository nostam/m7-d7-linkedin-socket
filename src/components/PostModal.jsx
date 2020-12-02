import React from "react";
import { Button, Col, Row, Modal, Image, Form } from "react-bootstrap";
import "../styles/PostModal.css"



class PostModal extends React.Component {

    state = {
        showModal: false,
        Me: {

        },
        Post: {
            text: ""
        }
    }

    fetchMe = async () => {
        try {
            const meFetch = await fetch(
                "https://striveschool-api.herokuapp.com/api/profile/me",
                {
                    headers: {
                        Authorization: process.env.REACT_APP_TOKEN,
                    },
                }
            );
            const meResponse = await meFetch.json();
            this.setState({ Me: meResponse });
        } catch (error) {
            console.log(error);
        }
    }

    addHashtag = () => {
        this.setState({ Post: { text: (this.state.Post.text + " #") } })
    }

    onChangeHandler = (e) => {
        this.setState({
            Post: {
                ...this.state.Post,
                [e.target.id]: e.currentTarget.value,
            },
        });
    };

    Post = async () => {
        try {
            const response = await fetch("https://striveschool-api.herokuapp.com/api/posts", {
                method: "POST",
                body: JSON.stringify(this.state.Post),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.REACT_APP_TOKEN,
                },
            });
            if (response.ok) {
                this.setState({ showModal: false });
                //this.props.refetch();
            } else {
                this.setState({ showModal: false });
            }
        } catch (e) {
            console.log(e);
        }
    };

    componentDidMount() {
        this.fetchMe()
    }

    render() {
        return (
            <>
                <Button variant="primary" size="md" onClick={() => this.setState({ showModal: true })} block>
                    Start a Post
                </Button>
                <Modal
                show={this.state.showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a Post</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col>
                                <Image
                                    src={this.state.Me.image}
                                    roundedCircle
                                    className="postModalImg"
                                />
                                <strong className="ml-5">{this.state.Me.name + " " + this.state.Me.surname}</strong>
                            </Col>
                        </Row>
                        <Form className="mt-2">
                            <Form.Group>
                                <Form.Control as="textarea" id="text" rows={3} value={this.state.Post.text} onChange={(e) => this.onChangeHandler(e)} />
                            </Form.Group>
                        </Form>
                        <Row>
                            <Col className="d-flex">
                                <Button variant="outline-primary" className="HashButton" onClick={this.addHashtag}>Add hashtag</Button>
                                <p className="ml-3 mt-2">Help the right people see your post</p>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.Post}>Post</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}


export default PostModal