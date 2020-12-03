import React from "react";
import { Button, Col, Row, Modal, Image, Form } from "react-bootstrap";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IconContext } from "react-icons";
import "../styles/PostModal.css";

class EditPost extends React.Component {
  state = {
    showModal: false,
    propPost: [],
    Post: [],
  };

  onChangeHandler = (e) => {
    this.setState({
      propPost: {
        ...this.state.propPost,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };

  Edit = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/${this.props.Post._id}`,
        {
          method: "PUT",
          body: JSON.stringify(this.state.propPost),
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
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

  Delete = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/${this.props.Post._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
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
    this.setState({ propPost: this.props.Post });
  }

  render() {
    return (
      <>
        <div
          onClick={() => this.setState({ showModal: true })}
          className="JumbBiPencilDiv"
        >
          <IconContext.Provider
            value={{
              size: "1.6vw",
              className: "JumbBiPencil",
            }}
          >
            <BiDotsHorizontalRounded />
          </IconContext.Provider>
        </div>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit a Post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>
                <Image
                  src={this.props.Post.user.image}
                  roundedCircle
                  className="postModalImg"
                />
                <strong className="ml-5">
                  {this.props.Post.user.name +
                    " " +
                    this.props.Post.user.surname}
                </strong>
              </Col>
            </Row>
            <Form className="mt-2">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  id="text"
                  rows={3}
                  value={this.state.propPost.text}
                  onChange={(e) => this.onChangeHandler(e)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.Delete}>
              Delete
            </Button>
            <Button variant="primary" onClick={this.Edit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EditPost;
