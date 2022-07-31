import React, { useState } from "react";
import axiosInstance from "../axios";
import "./css/Comment.css";

export default function Comment({ comment }) {
  const { content, author, upvotes, id } = comment;

  const upvote = () => {
    const putData = {
      content: content,
      author: author,
      upvotes: upvotes + 1,
    };
    axiosInstance
      .put("/comments/update/" + id + "/", putData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="comment_container">
        <div className="comment_content">
          <p className="">{content}</p>
        </div>
        <div className="comment_links">
          <span className="upvote-link" onClick={upvote}>
            Upvote?
          </span>
          <span className="upvote-number">{upvotes}</span>
        </div>
      </div>
    </>
  );
}
