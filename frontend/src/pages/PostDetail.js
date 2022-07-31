import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import Comment from "../components/Comment";
import FloatingButton from "../components/FloatingButton";
import "../components/css/Post.css";

export default function PostDetail() {
  const { slug } = useParams();
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [comments, setComments] = useState([]);
  // const [imageUrl, setImageUrl] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    axiosInstance.get("/posts/" + slug).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
      // setImageUrl(res.data.image);
    });
    axiosInstance.get("/comments/" + slug).then((res) => {
      setComments(res.data);
    });
  }, [slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //make post request to create comment
    axiosInstance
      .post("/comments/" + slug + "/create/", {
        content: commentText,
        author: 1,
        upvotes: 0,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const commentsDiv = comments.map((comment) => {
    return <Comment comment={comment} key={comment.id} />;
  });

  return (
    <div className="postdetail_container">
      <div className="post_left">
        {/* <img src={imageUrl} alt="post" /> */}
        <h3 className="postdetail_title">{title}</h3>
        <span className="postdetail_content">{content}</span>
      </div>
      <div className="post_right">
        <div className="d-flex justify-content-center pt-3 pb-2">
          <form onSubmit={handleSubmit}>
            <h2 className="comment_heading">Comments</h2>
            <input
              type="text"
              name="text"
              placeholder="+ Add a note"
              className="form-control addtxt postcomment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </form>
        </div>
        {commentsDiv}
        <FloatingButton slug={slug} />
      </div>
    </div>
  );
}
