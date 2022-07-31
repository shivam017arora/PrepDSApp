import "../components/css/FloatingButton.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import MyModal from "./Modal";

export default function EditFloatingButton({ slug }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/post/" + slug + "/edit");
  };

  const handleDelete = () => {
    setShow(true);
  };

  return (
    <>
      <div className="floating_button edit" onClick={handleEdit}>
        <EditIcon />
      </div>
      <div className="floating_button delete" onClick={handleDelete}>
        <MyModal show={show} slug={slug} />
        <DeleteIcon />
      </div>
    </>
  );
}
