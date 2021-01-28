import React, { Component } from "react";
import { Button, Image, Card } from "react-bootstrap";
import {
  BiLike,
  BiCommentDetail,
  BiShare,
  BiSend,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import { IconContext } from "react-icons";
import "./styles.css";
export default class FeedCard extends Component {
  render() {
    const { post } = this.props;
    return (
      <div>
        <Card className="w-100 my-4" key={`feed${post._id}`}>
          <Card.Header className="d-flex justify-content-between px-3">
            <div>
              <Image
                src={post.user.image}
                className="postModalImg mr-3"
                roundedCircle
              />
              {post.user.name + " " + post.user.surname}
            </div>
            {/* TODO if user = me */}
            <div onClick={this.props.toggle} className="JumbBiPencilDiv">
              <IconContext.Provider
                value={{
                  size: "24",
                  className: "JumbBiPencil",
                }}
              >
                <BiDotsHorizontalRounded />
              </IconContext.Provider>
            </div>
          </Card.Header>
          {post.image && (
            <Card.Img src={post.image} alt="PostImage" className="postImage" />
          )}
          <Card.Text className="p-3">{post.text}</Card.Text>
          <Card.Footer className="HomeModal bg-white justify-content-around">
            <Button variant="none">
              <BiLike /> Like
            </Button>
            <Button variant="none">
              <BiCommentDetail /> Comment
            </Button>
            <Button variant="none">
              <BiShare /> Share
            </Button>
            <Button variant="none">
              <BiSend /> Send
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
