import React, { Component } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import FeedCard from "../../components/FeedCard";
import { FadeLoader } from "react-spinners";
import PostModal from "../../components/PostModal";
import RSidebar from "../../components/RSidebar";
import Sidebar from "../../components/Sidebar";
import EditPost from "../../components/EditPost";
import uniqid from "uniqid";
import "./styles.css";
export default class Home extends Component {
  state = {
    posts: [],
    me: this.props.me,
    showAlert: null,
    err: false,
    errMsg: "",
    loading: true,
    links: {},
    morePosts: true,
    showModal: false,
    post: {},
  };
  getPosts = async (
    reload = false,
    params = "/posts?limit=5&sort=-createdAt"
  ) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${params}`);
      if (res.ok) {
        let data = await res.json();
        this.setState({
          posts:
            reload || this.state.posts.length === 0
              ? data.posts
              : [...this.state.posts, ...data.posts],
          loading: false,
          links: data.links,
        });
        if (data.posts.length < 5) this.setState({ morePosts: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        err: true,
        errMsg: error.messasge,
      });
    }
  };
  // getUser = async () => {
  //   try {
  //     const token = JSON.parse(localStorage.getItem("token"));
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}/profiles/me`, {
  //       headers: {
  //         Authorization: "Basic " + token,
  //       },
  //     });
  //     const user = await res.json();
  //     this.setState({ me: user });
  //     localStorage.setItem("id", user._id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  componentDidMount() {
    this.getPosts();
    // this.getUser();
  }
  toggleModal = (data) => {
    console.log("toggle data", data);
    if (data === undefined) this.setState({ post: {} });
    this.setState({ showModal: !this.state.showModal });
    this.setState({ post: data });
  };
  render() {
    const { err, loading, posts, errMsg, links, morePosts, showModal, post } =
      this.state;
    return (
      <div className="homeDiv">
        {err && (
          <Alert variant="danger" className="HomeCont">
            {errMsg}
          </Alert>
        )}
        <Container className="HomeCont justify-content-center d-flex w-100">
          {loading && err !== true ? (
            <FadeLoader loading={loading} size={60} />
          ) : (
            <Row>
              <Col className="d-none d-lg-block" md={3}>
                <RSidebar me={this.props.me} />
              </Col>
              <Col lg={6} md={9}>
                <PostModal
                  me={this.props.me}
                  refetch={() => this.getPosts(true)}
                />
                <Row className="sortBySeperator">
                  <hr className="hLine" />
                  <span>Sort by recent</span>
                </Row>
                {posts.map((post) => (
                  <FeedCard
                    meAvatar={this.props.me.image}
                    meId={this.props.me._id}
                    key={uniqid()}
                    post={post}
                    toggle={() => this.toggleModal(post)}
                    refetch={() => this.getPosts(true)}
                  />
                ))}
                {morePosts && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => this.getPosts(false, links.next)}
                    className="w-100"
                  >
                    More
                  </Button>
                )}
              </Col>
              <Col className="d-none d-md-block" md={3}>
                <Sidebar />
              </Col>
            </Row>
          )}
        </Container>
        {showModal && (
          <EditPost
            me={this.props.me}
            show={showModal}
            post={post}
            toggle={() => this.toggleModal()}
            refetch={() => this.getPosts(true)}
          />
        )}
      </div>
    );
  }
}
