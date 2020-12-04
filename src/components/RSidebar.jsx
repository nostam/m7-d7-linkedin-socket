import React from "react";
import { Image, Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class RSidebar extends React.Component {
  state = {
    Me: [],
  };
  logout = () => {
    localStorage.setItem("token", "");
    this.props.history.push("/");
  };
  render() {
    return (
      <>
        <Card className="RightSidebar">
          <Card.Body>
            <Card.Title>
              <Image
                src={this.props.me.image}
                roundedCircle
                className="postModalImg"
              />
            </Card.Title>
            <Card.Text>
              <p className="mb-0">
                {this.props.me.name + " " + this.props.me.surname}
              </p>
              <p>{this.props.me.title}</p>
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem action>Connections</ListGroupItem>
            <ListGroupItem action>See all Premium Features</ListGroupItem>
            <ListGroupItem action>My Items</ListGroupItem>
            <ListGroupItem onClick={() => this.logout()}>
              <Button size="sm" variant="outline-danger">
                Logout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </>
    );
  }
}
export default withRouter(RSidebar);
