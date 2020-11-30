import React from "react";
import {
  Container,
  Form,
  FormControl,
  Navbar,
  Nav,
  InputGroup,
  Col,
  Row,
} from "react-bootstrap";
import { withRouter, Link, NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
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
import "../styles/AppNavBar.css";
class AppNavBar extends React.Component {
  render() {
    return (
      <Navbar bg="white" variant="light" className="py-0">
        <div className="navbarContent">
          <Navbar.Brand
            as={Link}
            to="/"
            className="navbarBrand mr-1 d-flex nowrap"
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
                      size: "1rem",
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
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </InputGroup>
          </Form>
          <Nav.Link className="px-1">
            <Col className="navCol">
              <FaHome className="navIcon" />
              <span className="d-none d-lg-block navIconText">Home</span>
            </Col>
          </Nav.Link>
          <Nav.Link className="px-1">
            <Col className="navCol">
              <BsPeopleFill className="navIcon" />
              <span className="d-none d-lg-block navIconText">My Network</span>
            </Col>
          </Nav.Link>
          <Nav.Link className="px-1">
            <Col className="navCol">
              <GiHandBag className="navIcon" />{" "}
              <span className="d-none d-lg-block navIconText">Jobs</span>
            </Col>
          </Nav.Link>
          <Nav.Link className="px-1">
            <Col className="navCol">
              <RiMessage2Fill className="navIcon" />
              <span className="d-none d-lg-block navIconText">Messaging</span>
            </Col>
          </Nav.Link>
          <Nav.Link className="px-1">
            <Col className="navCol">
              <FaBell className="navIcon" />
              <span className="d-none d-lg-block navIconText">
                Notifications
              </span>
            </Col>
          </Nav.Link>
          <Nav.Link className="px-1">
            <Col className="navCol">
              <FaUserCircle className="navIcon" />
              <span className="d-none d-lg-block navIconText">Me</span>
            </Col>
          </Nav.Link>{" "}
          <Nav.Link className="px-1">
            <Col className="navCol">
              <BsGrid3X3Gap className="navIcon" />
              <span className="d-none d-lg-block navIconText">Work</span>
            </Col>
          </Nav.Link>
          <Nav.Link className="px-1">
            <Col className="navCol">
              <BsCollectionPlay className="navIcon" />
              <span className="d-none d-lg-block navIconText">Learning</span>
            </Col>
          </Nav.Link>
        </div>
      </Navbar>
    );
  }
}
export default withRouter(AppNavBar);
