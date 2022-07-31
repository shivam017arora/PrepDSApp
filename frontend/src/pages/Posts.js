import React from "react";
import Card from "../components/Card";

export default function Posts({ posts }) {
  const postList =
    posts.length > 0 ? (
      posts.map((post) => {
        return <Card post={post} key={post.id} />;
      })
    ) : (
      <div>No Posts</div>
    );
  return <div className="posts_container">{postList}</div>;
}
