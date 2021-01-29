import React from 'react'
import { ListGroup,Nav } from 'react-bootstrap'
import "./styles.css";
import {withRouter, Link } from "react-router-dom";

class SearchResult extends React.Component{


    render(){
        return(
            <>
           
            <ListGroup  className="results">
           
            {this.props.profile.length !== 0 && this.props.profile.slice(0,4).map((result)=>{
                return  <Nav.Link
                className="navCss"
                as={Link}
                to={`/user/${result._id}`}
              >  <ListGroup.Item><img src={result.image}  alt="placeholder"
                
                height="40px"
                width="40px" style={{ objectFit: "cover", borderRadius: "50%",marginLeft:"5px"}}></img>
                 <b>{result.name} {result.surname}</b>
                 <p  style={{display: 'inline'}}>{result.title}</p>
                 </ListGroup.Item>
                </Nav.Link> 
                        // <<Nav.Link>{result.surname} </Nav.Link> 
            })}
            </ListGroup>
            {/* <div>
            {this.props.profile.length !== 0 && this.props.profile.map((result)=>{
                return <h4>{result.name}</h4>
            })}
            </div> */}
            </>
        )
    }
}







export default withRouter(SearchResult)