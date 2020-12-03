import React, { Component } from "react";
import { Container, Modal, Button, Image, Row, Col } from "react-bootstrap";
import { BiLike, BiCommentDetail, BiShare, BiSend } from "react-icons/bi";
import EditPost from "./EditPost";
import PostModal from "./PostModal";
import RSidebar from "./RSidebar";
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
      console.log(this.state.posts);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="HomeDiv">
        <Container className="HomeCont">
          <Row>
            <Col>
              <RSidebar />
            </Col>
            <Col xs={6}>
              <PostModal />
              {this.state.posts.map((Posts) => (
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>
                      <Image
                        src={Posts.user.image}
                        roundedCircle
                        className="postModalImg  mr-3"
                      />
                      {Posts.user.name + " " + Posts.user.surname}
                      <EditPost Post={Posts} />
                    </Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Image src={Posts.image} className="PostImage" />
                    <p>{Posts.text}</p>
                  </Modal.Body>

                  <Modal.Footer className="HomeModal">
                    <Button variant="outline-dark">
                      <BiLike /> Like
                    </Button>
                    <Button variant="outline-dark">
                      <BiCommentDetail /> Comment
                    </Button>
                    <Button variant="outline-dark">
                      <BiShare /> Share
                    </Button>
                    <Button variant="outline-dark">
                      <BiSend /> Send
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              ))}
            </Col>
            <Col>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
