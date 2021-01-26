import React, { Component } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import FeedCard from "../../components/FeedCard";
import { FadeLoader } from "react-spinners";
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
    links: {},
  };
  getPosts = async (params = "/posts?limit=5") => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${params}`);
      if (res.ok) {
        let data = await res.json();
        this.setState({
          posts:
            this.state.posts.length === 0
              ? data.posts
              : [...this.state.posts, ...data.posts],
          loading: false,
          links: data.links,
        });
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
  getUser = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/profiles/600ec552cde6445148228b53`
      );
      const user = await res.json();
      console.log(user);
      this.setState({ me: user });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getPosts();
    this.getUser();
  }
  render() {
    const { err, loading, posts, me, errMsg, links } = this.state;
    return (
      <div className="homeDiv">
        {err && (
          <Alert variant="danger" className="HomeCont">
            {errMsg}
          </Alert>
        )}
        <Container className="HomeCont justify-content-center d-flex">
          {loading && err !== true ? (
            <FadeLoader loading={loading} size={60} />
          ) : (
            <Row>
              <Col className="d-none d-lg-block" md={3}>
                <RSidebar me={me} />
              </Col>
              <Col lg={6} md={9}>
                <PostModal refetch={() => this.getPosts()} me={me} />
                {posts.map((post) => (
                  <FeedCard key={post._id} post={post} />
                ))}
                <Button
                  variant="outline-secondary"
                  onClick={() => this.getPosts(links.next)}
                  className="w-100"
                >
                  Next
                </Button>
              </Col>
              <Col className="d-none d-md-block" md={3}>
                <Sidebar />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}
