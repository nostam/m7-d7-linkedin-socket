import React, { Component } from "react";
import { Button, Image, Card } from "react-bootstrap";
import EditPost from "../../components/EditPost";
import { BiLike, BiCommentDetail, BiShare, BiSend } from "react-icons/bi";
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
            <EditPost post={post} refetch={() => this.getPosts()} />
          </Card.Header>
          {post.image && (
            <Card.Img src={post.image} alt="PostImage" className="postImage" />
          )}
          <Card.Text className="p-3">{post.text}</Card.Text>
          <Card.Footer className="HomeModal bg-white">
            <Button variant="outline-dark mx-1">
              <BiLike /> Like
            </Button>
            <Button variant="outline-dark mx-1">
              <BiCommentDetail /> Comment
            </Button>
            <Button variant="outline-dark mx-1">
              <BiShare /> Share
            </Button>
            <Button variant="outline-dark mx-1">
              <BiSend /> Send
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
