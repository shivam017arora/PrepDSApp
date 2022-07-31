import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

export default function MyModal({ show, slug }) {
  let navigate = useNavigate();
  const handleDelete = () => {
    axiosInstance.delete("/posts/" + slug + "/").then((res) => {
      navigate("/");
    });
  };
  return (
    <>
      <Modal
        show={show}
        onHide={() => window.location.reload()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="dark" onClick={() => handleDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
