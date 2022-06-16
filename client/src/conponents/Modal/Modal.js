import React from "react";
import "./Modal.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as courseService from "../../services/courseService"

function Modal({ setOpenModal }) {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const deleteHandler = (e) => {
    e.preventDefault();

    courseService.remove(courseId)
      .then((msg) => {
        alert(msg)
        navigate('/');
      });
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Delete?</h1>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
          Cancel
          </button>
          < button className="delete-Btn" onClick={deleteHandler} > Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;