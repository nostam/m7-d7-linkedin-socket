import React from "react";
import { Button, Col, Row, Modal, Image, Form } from "react-bootstrap";
import { FaCamera, FaVideo, FaStickyNote, FaPenSquare } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import "../styles/PostModal.css";

class PostModal extends React.Component {
  state = {
    showModal: false,
    me: {},
    post: {
      text: "",
    },
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
      this.setState({ me: meResponse });
    } catch (error) {
      console.log(error);
    }
  };

  addHashtag = () => {
    this.setState({ post: { text: this.state.post.text + " #" } });
  };

  onChangeHandler = (e) => {
    this.setState({
      post: {
        ...this.state.post,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };

  post = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/posts",
        {
          method: "POST",
          body: JSON.stringify(this.state.post),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
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
    this.fetchMe();
  }

  render() {
    return (
      <>
        <Button
          className="postButton"
          variant="outline-dark"
          size="md"
          onClick={() => this.setState({ showModal: true })}
          block
        >
          <BiPencil /> Start a Post
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a Post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>
                <Image
                  src={this.state.me.image}
                  roundedCircle
                  className="postModalImg"
                />
                <strong className="ml-5">
                  {this.state.me.name + " " + this.state.me.surname}
                </strong>
              </Col>
            </Row>
            <Form className="mt-2">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  id="text"
                  rows={3}
                  value={this.state.post.text}
                  onChange={(e) => this.onChangeHandler(e)}
                />
              </Form.Group>
            </Form>
            <Row>
              <Col className="d-flex">
                <Button
                  variant="outline-primary"
                  className="HashButton"
                  onClick={this.addHashtag}
                >
                  Add hashtag
                </Button>
                <p className="ml-3 mt-2">Help the right people see your post</p>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn">
              <i>
                <FaCamera style={{ color: "#666666" }} size={30} />
              </i>
            </button>
            <button className="btn">
              <i>
                <FaVideo style={{ color: "#666666" }} size={30} />
              </i>
            </button>
            <button className="btn">
              <i>
                <FaStickyNote style={{ color: "#666666" }} size={30} />
              </i>
            </button>
            <button className="btn">
              <i>
                <FaPenSquare
                  className="pen mx-1"
                  style={{ color: "#666666" }}
                  size={30}
                />
              </i>
            </button>
            <Button variant="primary" onClick={this.post}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default PostModal;
