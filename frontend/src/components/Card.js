import React from "react";
import defaultImage from "./images/default.png";
import "./css/Card.css";
import { Link } from "react-router-dom";

export default function Card({ post }) {
  console.log(post);
  return (
    <Link
      to={`/post/${post.slug}`}
      style={{ textDecoration: "none", color: "#222" }}
    >
      <div className="card_container">
        <div>
          <img src={post.image || defaultImage} alt="" />
        </div>
        <div className="card_details">
          <span>{post.title}</span>
          <div>{post.content.slice(0, 100) + "..."}</div>
        </div>
      </div>
    </Link>
  );
}
