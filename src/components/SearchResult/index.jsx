import React from "react";
import { ListGroup, Nav, Row } from "react-bootstrap";
import "./styles.css";
import { withRouter, Link } from "react-router-dom";

class SearchResult extends React.Component {
  render() {
    return (
      <>
        <ListGroup className="results">
          {this.props.profile.length !== 0 &&
            this.props.profile.slice(0, 4).map((result) => {
              return (
                <Nav.Link
                  className="searchBarLink"
                  as={Link}
                  to={`/user/${result._id}`}
                >
                  <ListGroup.Item className="seachListGrp">
                    <Row className="flex-nowarp">
                      <img
                        src={result.image}
                        alt="placeholder"
                        className="searchResultAvatar"
                      />
                      <p className="searchResultText">
                        {result.name} {result.surname}
                      </p>
                      <p style={{ display: "inline" }}>{result.title}</p>
                    </Row>
                  </ListGroup.Item>
                </Nav.Link>
              );
              // <<Nav.Link>{result.surname} </Nav.Link>
            })}
        </ListGroup>
        {/* <div>
            {this.props.profile.length !== 0 && this.props.profile.map((result)=>{
                return <h4>{result.name}</h4>
            })}
            </div> */}
      </>
    );
  }
}

export default withRouter(SearchResult);
