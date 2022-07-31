import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import React, { useEffect, useState } from "react";

export default function EditPost() {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    axiosInstance.get("/posts/" + slug).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [slug]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleUpdate = () => {
    const putData = {
      title: title,
      content: content,
      slug: slug,
      author: 1,
    };
    axiosInstance
      .put("/posts/" + slug + "/", putData)
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <button onClick={handleUpdate}>Update</button>
        </div>
      </form>
    </div>
  );
}
