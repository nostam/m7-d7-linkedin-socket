import React from "react";
import {
  Form,
  FormControl,
  Navbar,
  Nav,
  InputGroup,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import SearchResult from "../SearchResult";
import {
  FaLinkedin,
  FaSearch,
  FaHome,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { BsPeopleFill, BsGrid3X3Gap, BsCollectionPlay } from "react-icons/bs";
import { GiHandBag } from "react-icons/gi";
import { RiMessage2Fill } from "react-icons/ri";
import "./styles.css";
class AppNavBar extends React.Component {
  state = {
    query: null,
    profiles: [],
  };

  handleSearchProfiles = (e) => {
    let currentId = e.currentTarget.id;
    this.setState({ profiles: [] });
    let query = e.currentTarget.value;
    if (e.currentTarget.value.length > 0) {
      // }else{
      this.setState({ query }, console.log(this.state));
      fetch(`${process.env.REACT_APP_API_URL}/profiles?name=${query}`, {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + localStorage.getItem("token"),
          ContentType: "application/json",
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((info) => {
          let profiles = [...info];
          console.log(profiles);
          this.setState({ profiles: profiles });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  render() {
    const { query, profiles } = this.state;
    return (
      <>
        <Navbar bg="white" variant="light" className="py-0 fixed-top">
          <div className="navbarContent">
            <Navbar.Brand
              as={Link}
              to="/home"
              className="navbarBrand d-flex nowrap mr-2"
            >
              <IconContext.Provider
                value={{
                  size: "38px",
                  className: "linkedinIcon",
                  color: "#0a66c2",
                  title: "LinkedIn",
                }}
              >
                <FaLinkedin />
              </IconContext.Provider>
            </Navbar.Brand>
            <Form inline className="navSearch">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <IconContext.Provider
                      value={{
                        size: "15",
                        className: "SearchIcon",
                        color: "grey",
                        backgroundColor: "#60627c",
                      }}
                    >
                      <FaSearch />
                    </IconContext.Provider>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  value={this.props.query}
                  id="query"
                  type="text"
                  placeholder="Search"
                  onChange={this.handleSearchProfiles}
                />
              </InputGroup>
            </Form>

            <div className="ml-auto mr-0 d-flex row justify-content-end">
              <Nav.Link className="navLinkCol flex-column" as={Link} to="/Home">
                <FaHome className="navIcon" />
                <span className="navIconText">Home</span>
              </Nav.Link>
              <Nav.Link className="navLinkCol flex-column">
                <BsPeopleFill className="navIcon" />
                <span className="navIconText">My Network</span>
              </Nav.Link>
              <Nav.Link className="navLinkCol flex-column">
                <GiHandBag className="navIcon" />
                <span className="navIconText">Jobs</span>
              </Nav.Link>
              <Nav.Link className="navLinkCol flex-column">
                <RiMessage2Fill className="navIcon" />
                <span className="navIconText">Messaging</span>
              </Nav.Link>
              <Nav.Link className="navLinkCol flex-column">
                <FaBell className="navIcon" />
                <span className="navIconText">Notifications</span>
              </Nav.Link>
              <DropdownButton id="dropdown-basic-button" title="me">
                <div>
                  <img
                    src={this.props.me.image}
                    className="imgDropdown"
                    alt="placeholder"
                    height="40px"
                    width="40px"
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginLeft: " 10px",
                    }}
                  ></img>
                  <b>
                    {this.props.me.name} {this.props.me.surname}
                  </b>
                </div>

                <Nav.Link
                  className="navLinkCol flex-column"
                  as={Link}
                  to="/user/me"
                >
                  {" "}
                  <Button variant="outline-primary" className="noHover">
                    View profile
                  </Button>{" "}
                </Nav.Link>
                <hr style={{ margin: "0px" }} />
                <b style={{ paddingLeft: "8px ", margin: "0px 2px 0px 0px" }}>
                  Account
                </b>
                <p
                  style={{
                    paddingLeft: "8px",
                    margin: "0px 130px 0px 0px",
                    color: "#788fa5",
                  }}
                >
                  Upgrade my plane
                </p>
                <p
                  style={{
                    paddingLeft: "8px",
                    margin: "0px 2px 0px 0px",
                    color: "#788fa5",
                  }}
                >
                  Settings and privacy
                </p>
                <p
                  style={{
                    paddingLeft: "8px",
                    margin: "0px 2px 0px 0px",
                    color: "#788fa5",
                  }}
                >
                  Help
                </p>
                <p
                  style={{
                    paddingLeft: "8px",
                    margin: "0px 2px 0px 0px",
                    color: "#788fa5",
                  }}
                >
                  Language
                </p>
                <hr />
                <b style={{ paddingLeft: "8px ", margin: "0px 2px 0px 0px" }}>
                  Manage
                </b>
                <p
                  style={{
                    paddingLeft: "8px",
                    margin: "0px 2px 0px 0px",
                    color: "#788fa5",
                  }}
                >
                  Posts & Activity
                </p>
                <p
                  style={{
                    paddingLeft: "8px",
                    margin: "0px 2px 0px 0px",
                    color: "#788fa5",
                  }}
                >
                  Job Posting Account
                </p>
                <hr style={{ margin: "0px" }} />
                <Nav.Link
                  className="navLinkCol flex-column"
                  as={Link}
                  to="/login"
                >
                  <p
                    style={{
                      paddingLeft: "29px",
                      margin: "0px 2px 0px 0px",
                      color: "#788fa5",
                    }}
                  >
                    Sing Out
                  </p>
                </Nav.Link>
              </DropdownButton>
              <Nav.Link
                className="navLinkCol flex-column"
                as={Link}
                to="/user/me"
              >
                <FaUserCircle className="navIcon" />
                <span className="navIconText">Me</span>
              </Nav.Link>
              <div className="vl"></div>
              <Nav.Link className="navLinkCol flex-column">
                <BsGrid3X3Gap className="navIcon" />
                <span className="navIconText">Work</span>
              </Nav.Link>
              <Nav.Link className="navLinkCol flex-column">
                <BsCollectionPlay className="navIcon" />
                <span className="navIconText">Learning</span>
              </Nav.Link>
            </div>
          </div>
        </Navbar>
        {query !== 0 && <SearchResult profile={profiles} />}
      </>
    );
  }
}

export default withRouter(AppNavBar);
