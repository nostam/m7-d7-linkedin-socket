import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import FooterLogo from "../footer_logo.svg";
import "../styles/Login.css";
export default class Login extends Component {
  state = {
    user: [],
  };
  onChangeHandler = (e) => {
    this.setState({
      user: { ...this.state.user, [e.target.id]: e.currentTarget.value },
    });
  };
  render() {
    return (
      <Col md={10} className="loginContainer mt-5 mx-auto">
        <img src={FooterLogo} className="my-4 py-2" />
        <h4>Welcome Back</h4>
        <h6>
          Don't miss your next opportunity. Sign in to stay updated on your
          professional world.
        </h6>
        <Col md={6}>
          <Form>
            <Form.Group>
              <Form.Control
                required
                id="username"
                value={this.state.user.username}
                type="text"
                size="lg"
                placeholder="Email or Phone"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Col>
    );
  }
}
