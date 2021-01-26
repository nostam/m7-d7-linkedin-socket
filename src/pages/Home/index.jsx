import React, { Component } from "react";
import {
  Container,
  Button,
  Image,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import { BiLike, BiCommentDetail, BiShare, BiSend } from "react-icons/bi";
import EditPost from "../../components/EditPost";
import PostModal from "../../components/PostModal";
import RSidebar from "../../components/RSidebar";
import Sidebar from "../../components/Sidebar";
import "./styles.css";
export default class Home extends Component {
  state = {
    posts: [],
    me: {},
    showAlert: null,
    err: false,
    errType: null,
    errMsg: "",
    loading: true,
  };
  fetchPost = async () => {
    console.log("fetchPost");
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/posts/",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        let postResponse = await response.json();
        postResponse = postResponse.reverse().slice(0, 50);
        this.setState({ posts: postResponse, loading: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        err: true,
        errType: "danger",
        errMsg: error.messasge,
      });
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
  render() {
    const { err, loading, posts, me, errMsg } = this.state;
    return (
      <div className="homeDiv">
        <Container className="HomeCont justify-content-center d-flex">
          {err && <Alert variant="danger">{errMsg}</Alert>}
          {loading && err !== true ? (
            <FadeLoader loading={loading} size={60} />
          ) : Object.keys(posts).length !== 0 ? (
            <Row>
              <Col className="d-none d-lg-block" md={3}>
                <RSidebar me={me} />
              </Col>
              <Col lg={6} md={9}>
                <PostModal refetch={() => this.fetchPost()} me={me} />
                {posts.map((post) => (
                  <Card className="w-100 my-4" key={`feed${post._id}`}>
                    <Card.Header className="d-flex justify-content-between px-3">
                      <div>
                        <Image
                          src={post.user.image}
                          className="postModalImg mr-3"
                          roundedCircle
                        />
                        {post.user.name + " " + post.user.surname}
                      </div>
                      <EditPost post={post} refetch={() => this.fetchPost()} />
                    </Card.Header>
                    {post.image && (
                      <Card.Img
                        src={post.image}
                        alt="PostImage"
                        className="postImage"
                      />
                    )}
                    <Card.Text className="p-3">{post.text}</Card.Text>
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
          ) : (
            this.setState({
              err: true,
              errType: "warning",
              errMsg: "We have encounter a problem, the profile is empty",
            })
          )}
        </Container>
      </div>
    );
  }
}
