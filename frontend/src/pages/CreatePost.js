import React, { useState } from "react";
import "../components/css/CreatePost.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const postData = {
      title: title,
      content: content,
      slug: string_to_slug(title),
      author: 1,
    };
    axiosInstance
      .post("/posts/", postData)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="createpost_container">
      <form className="createpost_form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Title"
          className="posttitle_field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          className="postcontent_field"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="postform_button">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit}>Post</button>
        </div>
      </form>
    </div>
  );
}
