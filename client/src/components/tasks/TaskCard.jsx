import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
import "./task.css";

const TaskCard = ({ title, body, onEdit, onDelete, }) => {
  return (
    <li className="task-item">
      <div className="task-text">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <div className="task-actions">
        <button className="btn-edit" onClick={onEdit}>
          <GrDocumentUpdate />
        </button>
        <button className="btn-delete" onClick={onDelete}>
          <FaTrashAlt />
        </button>
      </div>
    </li>
  );
};

export default TaskCard;
