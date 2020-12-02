import React, { Component } from "react";
import { Col, Form, Button, Container } from "react-bootstrap";
import FooterLogo from "../footer_logo.svg";
import "../styles/Login.css";
export default class Login extends Component {
  state = {
    user: [],
    hidden: true,
  };
  onChangeHandler = (e) => {
    this.setState({
      user: { ...this.state.user, [e.target.id]: e.currentTarget.value },
    });
  };
  toggleShow = (e) => {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  };
  render() {
    return (
      <Container>
        <Col lg={10} className="loginContainer mt-5 mx-auto">
          <img src={FooterLogo} className="my-4 py-2" />
          <h4>Welcome Back</h4>
          <h6>
            Don't miss your next opportunity. Sign in to stay updated on your
            professional world.
          </h6>
        </Col>
        <Col lg={3}>
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
            <Form.Group>
              <Form.Control
                required
                id="password"
                value={this.state.user.password}
                type={this.state.hidden ? "password" : "text"}
                size="lg"
                placeholder="Password"
                onChange={(e) => this.onChangeHandler(e)}
              />
              <button onClick={(e) => this.toggleShow(e)}>
                {this.state.hidden ? "Show" : "Hide"}
              </button>
            </Form.Group>
          </Form>
          <Button className="loginBtn">Sign in</Button>
        </Col>
      </Container>
    );
  }
}
