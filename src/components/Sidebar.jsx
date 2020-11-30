import React, { Component } from "react";
import { Row } from "react-bootstrap";
import "./Sidebar.css";

class Sidebar extends Component {
  state = {
    users: [],
  };
  componentDidMount = () => {
    let response = fetch("https://striveschool-api.herokuapp.com/api/profile", {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM0ZWU3N2VkMjY2ODAwMTcwZWEzZTciLCJpYXQiOjE2MDY3NDE2MjQsImV4cCI6MTYwNzk1MTIyNH0.STnsxsacz4ygONashW1XfNqAZH-GP_QeIGilDbrfQ2w",
        ContentType: "application/json",
      }),
    })
      .then((response) => response.json())
      .then((info) => {
        console.log(info);

        this.setState({ users: info }, console.log(this.state.users));
        console.log(this.state.users);
      });
  };
  render() {
    return (
      <>
        <div id="ad-div">
          <img
            id="ad"
            src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
            alt="Advertise on LinkedIn"
            border={0}
          />
        </div>
        <div id="usersDiv">
          {this.state.users &&
            this.state.users.map((user) => (
              <div id="userdiv2">
                <Row id="userdiv2">
                  <img id="user" src={user.image}></img>
                  <div id="userdiv2">
                    <h1 id="usersh1">{user.name}</h1>
                    <p id="usersh1">{user.title}</p>
                  </div>
                </Row>
              </div>
            ))}
        </div>
        <div id="ad-div">
          <img
            id="ad"
            src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
            alt="Advertise on LinkedIn"
            border={0}
          />
        </div>
      </>
    );
  }
}

export default Sidebar;
