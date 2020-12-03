import React, { Component } from "react";
import { Container, Button, Image, Row, Col, Card } from "react-bootstrap";
import { BiLike, BiCommentDetail, BiShare, BiSend } from "react-icons/bi";
import EditPost from "./EditPost";
import PostModal from "./PostModal";
import RSidebar from "./RSidebar";
import Sidebar from "./Sidebar";
import "../styles/Home.css";
export default class Home extends Component {
  state = {
    posts: [],
  };
  fetchPost = async () => {
    try {
      const postFetch = await fetch(
        "https://striveschool-api.herokuapp.com/api/posts/ ",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      let postResponse = await postFetch.json();
      postResponse.reverse().slice(0, 20);
      this.setState({ posts: postResponse });
      console.log("Update");
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchPost();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.posts !== this.state.posts) {
  //     this.fetchPost();
  //   }
  // } disabled because spamming api every sec

  render() {
    return (
      <div className="homeDiv">
        <Container className="HomeCont">
          <Row>
            <Col className="d-none d-lg-block">
              <RSidebar />
            </Col>
            <Col lg={6}>
              <PostModal />
              {this.state.posts.map((post) => (
                <Card className="w100 my-4" key="post._id">
                  <Card.Header className="d-flex justify-content-between px-3">
                    <div>
                      <Image
                        src={post.user.image}
                        className="postModalImg  mr-3"
                      />
                      {post.user.name + " " + post.user.surname}
                    </div>
                    <EditPost Post={post} />
                  </Card.Header>
                  {post.image && (
                    <Card.Img
                      src={post.image}
                      alt="PostImage"
                      className="postImage"
                    />
                  )}
                  <p>{post.text}</p>
                  <Card.Footer className="HomeModal">
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
                  </Card.Footer>
                </Card>
              ))}
            </Col>
            <Col className="d-none d-md-block">
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
