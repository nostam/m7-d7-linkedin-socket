import React, { Component } from "react";
import { Container, Modal, Button, Image, Row, Col } from "react-bootstrap";
import EditPost from "./EditPost";
import PostModal from "./PostModal";
import Sidebar from "./Sidebar";

export default class Home extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    try {
      const postFetch = await fetch(
        "https://striveschool-api.herokuapp.com/api/posts/ ",
        {
          headers: {
            Authorization: process.env.REACT_APP_TOKEN,
          },
        }
      );
      const postResponse = await postFetch.json();
      this.setState({ posts: postResponse });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={8}>
            <PostModal />
            {this.state.posts.map((post) => (
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>
                    <Image
                      src={post.user.image}
                      roundedCircle
                      className="postModalImg"
                    />
                    {post.user.name + " " + post.user.surname}
                    <EditPost Post={post} />
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>{post.text}</p>
                </Modal.Body>

                <Modal.Footer className="HomeModal">
                  <Button variant="primary">Like</Button>
                  <Button variant="primary">Comment</Button>
                  <Button variant="primary">Share</Button>
                  <Button variant="primary">Send</Button>
                </Modal.Footer>
              </Modal.Dialog>
            ))}
          </Col>
          <Col>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    );
  }
}
