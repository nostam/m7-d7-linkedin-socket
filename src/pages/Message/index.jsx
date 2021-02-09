import React, { Component } from "react";
import io from "socket.io-client";
import {
  Container,
  Row,
  Col,
  ListGroup,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import "./styles.css";
export default class Message extends Component {
  socket = null;
  state = {
    message: "",
    messages: [],
    list: [],
    opponent: null,
    history: [],
  };

  componentDidMount() {
    const connOpt = {
      transports: ["websocket"],
    };

    this.getChatHistory();
    this.socket = io("https://striveschool-api.herokuapp.com", connOpt);
    this.socket.on("list", (users) => {
      const otherUsers = users.filter(
        (user) => user !== this.props.me.username
      );
      this.setState({ list: [...new Set(otherUsers)] });
    });
    this.socket.on("chatmessage", (msg) => {
      this.setState({ messages: this.state.messages.concat(msg) });
    });
    this.socket.on("bmsg", (msg) => console.log("bmsg", msg));
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }
  getChatHistory = async () => {
    try {
      const res = await fetch(
        `https://striveschool-api.herokuapp.com/api/messages/${this.props.me.username}`
      );
      if (res.ok) {
        const data = await res.json();
        this.setState({ history: data });
        console.log("history", data);
        if (this.state.history.length === 0) {
          const user = { username: this.props.me.username };
          this.socket.emit("setUsername", user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleMessage = (e) => {
    this.setState({ message: e.currentTarget.value });
  };

  sendMessage = (e) => {
    e.preventDefault();
    if (this.state.message !== "") {
      this.socket.emit("chatmessage", {
        from: this.props.me.username,
        text: this.state.message,
        to: this.state.opponent,
      });
      this.setState({
        message: "",
      });
    }
  };

  selectOpp = (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
    if (isNaN(this.state.opponent)) {
      const filterd = this.state.history.filter(
        (msg) => msg.from === this.state.opponent
      );
      console.log("msg", filterd);
      this.setState({ messages: filterd });
    } else {
      this.setState({ messages: [] });
    }
    e.target.innerText === this.state.opponent
      ? this.setState({
          opponent: null,
          messages: [],
        })
      : this.setState({ opponent: e.target.innerText });
  };

  render() {
    const { message, list, messages, opponent } = this.state;
    return (
      <div>
        <Container className="BodyContainer justify-content-center d-flex w-100">
          <Row>
            <Col md={9}>
              <Row>
                <Col md={4}>
                  Message List
                  <ListGroup>
                    {list.map((user, i) => (
                      <ListGroup.Item
                        as="li"
                        key={i}
                        name={user}
                        active={opponent === user ? true : false}
                        onClick={this.selectOpp}
                      >
                        {user}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={8}>
                  <strong>Private Chat </strong>
                  <div>user info here</div>
                  <Col id="messages">
                    {messages.length > 0 &&
                      messages
                        .slice(messages.length - 5, messages.length - 1)
                        .map((msg, i) => (
                          <Row key={i}>
                            <Col
                              className={
                                msg.from === opponent ? "msg" : "msg ownMsg"
                              }
                            >
                              <strong>{msg.from}</strong> @
                              {new Date(msg.createdAt).toISOString()} <br />
                              {msg.text}
                            </Col>
                          </Row>
                        ))}
                  </Col>
                  <InputGroup
                    id="chat"
                    className="mb-3"
                    onSubmit={this.sendMessage}
                  >
                    <FormControl
                      placeholder={
                        isNaN(opponent) ? `to ${opponent}` : `Select to chat`
                      }
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={message}
                      onChange={this.handleMessage}
                    />
                    <InputGroup.Append>
                      <Button onClick={this.sendMessage}>Send</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </Row>
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
