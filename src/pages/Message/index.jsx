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
    const user = { username: this.props.me.username };
    this.getChatHistory();
    this.socket = io("https://striveschool-api.herokuapp.com", connOpt);
    this.socket.emit("setUsername", user);
    this.socket.on("list", (users) => {
      const otherUsers = users.filter(
        (user) => user !== this.props.me.username
      );
      this.setState({ list: [...new Set(otherUsers)] });
    });
    this.socket.on("chatmessage", (msg) => {
      this.setState({ messages: this.state.message.concat(msg) });
    });
    this.socket.on("bmsg", (msg) => console.log("bmsg", msg));
  }
  getChatHistory = async () => {
    try {
      const res = await fetch(
        `https://striveschool-api.herokuapp.com/api/messages/${this.props.me.username}`
      );
      if (res.ok) {
        const data = await res.json();
        this.setState({ history: data });
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
    this.setState({
      opponent:
        e.target.textContext === this.state.opponent
          ? null
          : e.target.textContent,
    });
    //TODO
    if (isNaN(this.state.opponent)) {
      const filterd = this.state.message.filter(
        (msg) => msg.from !== this.state.opponent
      );
      this.setState({ history: filterd });
    } else {
      this.setState({ history: [] });
    }
  };

  render() {
    const { message, list, history, opponent } = this.state;
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
                    {history.length > 0 &&
                      history
                        .slice(history.length - 5, history.length - 1)
                        .map((msg, i) => (
                          <Row key={i}>
                            <Col>
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
