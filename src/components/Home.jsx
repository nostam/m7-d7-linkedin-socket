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
    me: {},
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
  fetchMe = async () => {
    try {
      const meFetch = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/me",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const meResponse = await meFetch.json();
      console.log(meResponse);
      this.setState({ me: meResponse });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.fetchPost();
    this.fetchMe();
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
            <Col className="d-none d-lg-block" lg={3}>
              <RSidebar me={this.state.me} />
            </Col>
            <Col lg={6} md={9}>
              <PostModal refetch={() => this.fetchPost()} me={this.state.me} />
              {this.state.posts.map((post) => (
                <Card className="w100 my-4" key={`feed${post._id}`}>
                  <Card.Header className="d-flex justify-content-between px-3">
                    <div>
                      <Image
                        src={post.user.image}
                        className="postModalImg mr-3"
                        roundedCircle
                      />
                      {post.user.name + " " + post.user.surname}
                    </div>
                    <EditPost post={post} />
                  </Card.Header>
                  {post.image && (
                    <Card.Img
                      src={post.image}
                      alt="PostImage"
                      className="postImage"
                    />
                  )}
                  <Card.Text className="p-2">{post.text}</Card.Text>
                  <Card.Footer className="HomeModal bg-white">
                    <Button variant="outline-dark mx-1">
                      <BiLike /> Like
                    </Button>
                    <Button variant="outline-dark mx-1">
                      <BiCommentDetail /> Comment
                    </Button>
                    <Button variant="outline-dark mx-1">
                      <BiShare /> Share
                    </Button>
                    <Button variant="outline-dark mx-1">
                      <BiSend /> Send
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </Col>
            <Col className="d-none d-md-block" md={3}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
