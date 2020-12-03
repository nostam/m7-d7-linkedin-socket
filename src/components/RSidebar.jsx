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
  async componentDidMount() {
    try {
      const MeFetch = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/me",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const MeResponse = await MeFetch.json();
      this.setState({ Me: MeResponse });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        <Card className="RightSidebar">
          <Card.Body>
            <Card.Title>
              <Image
                src={this.state.Me.image}
                roundedCircle
                className="postModalImg"
              />
            </Card.Title>
            <Card.Text>
              <p className="mb-0">
                {this.state.Me.name + " " + this.state.Me.surname}
              </p>
              <p>{this.state.Me.title}</p>
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
