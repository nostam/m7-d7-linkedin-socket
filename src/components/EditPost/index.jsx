import React from "react";
import { Button, Col, Row, Modal, Image, Form } from "react-bootstrap";
import "../PostModal/styles.css";

class EditPost extends React.Component {
  state = {
    content: { text: "" },
    post: {},
    selectedFile: null,
    imgSubmitStatus: "secondary",
  };
  url = `${process.env.REACT_APP_API_URL}/posts/`;
  headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  };
  onChangeHandler = (e) => {
    this.setState({
      content: {
        ...this.state.content,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };
  submitData = async (str) => {
    const url =
      str === "POST" ? `${this.url}` : `${this.url}${this.props.post._id}`;
    const payload = JSON.stringify({
      ...this.state.content,
      username: this.props.me.username,
    });
    try {
      console.log(payload, str);
      const response = await fetch(url, {
        method: str,
        headers: this.headers,
        body: payload,
      });
      if (response.ok) {
        if (this.state.selectedFile !== null) {
          this.fileUploadHandler();
        } else {
          this.props.toggle();
          this.props.refetch();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  actionBtn = (str) => {
    //TODO actionBtn is a redundant proxy, it can be replace directly with submitData
    str !== "DELETE"
      ? this.submitData(this.isNewPost() ? "POST" : "PUT")
      : this.submitData("DELETE");
  };
  isNewPost = () => {
    return this.props.post === undefined ? true : false;
  };
  fileSelectHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      imgSubmitStatus: "success",
    });
  };

  fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append("post", this.state.selectedFile);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${this.props.post._id}`,
        {
          method: "POST",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          body: fd,
        }
      );
      if (response.ok) {
        this.setState({ showModal: false }, () => this.props.refetch());
      } else {
        this.setState({ showModal: false });
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount = () => {
    if (this.props.post === undefined) this.setState({ content: { text: "" } });
    this.setState({ content: this.props.post });
  };
  render() {
    const { imgSubmitStatus, content } = this.state;
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.isNewPost() ? "Add a new post" : "Edit a Post"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Object.keys(this.props.me).length > 0 && (
              <Row>
                <Col>
                  <Image
                    src={this.props.me.image}
                    roundedCircle
                    className="postModalImg"
                  />
                  <strong className="ml-5">
                    {this.props.me.name + " " + this.props.me.surname}
                  </strong>
                </Col>
              </Row>
            )}
            <Form className="mt-2">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  id="text"
                  rows={3}
                  value={
                    this.props.post !== undefined ? content.text : undefined
                  }
                  onChange={(e) => this.onChangeHandler(e)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            {!this.isNewPost() && (
              <Button
                className="mr-auto"
                variant="danger"
                onClick={() => this.actionBtn("DELETE")}
              >
                Delete Post
              </Button>
            )}
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.fileSelectHandler}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
            <Button
              variant={imgSubmitStatus}
              onClick={() => this.fileInput.click()}
            >
              {imgSubmitStatus === "secondary"
                ? "Choose an image"
                : "Ready to Upload"}
            </Button>
            <Button
              variant="primary"
              onClick={() => this.actionBtn(this.isNewPost() ? "PUT" : "POST")}
            >
              {this.isNewPost() ? "Submit" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EditPost;
