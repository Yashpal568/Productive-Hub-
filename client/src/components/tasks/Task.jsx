import React, { useState, useEffect } from "react";
import "./task.css";
import TaskCard from "./TaskCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const addTask = async () => {
    const id = sessionStorage.getItem("id"); // getting id 
    if (!inputs.title.trim() || !inputs.body.trim()) {
      toast.error("Title or Body cannot be empty!");
      return;
    }

    if (id) {
      await axios
        .post(`${window.location.origin}/api/v2/addTask`, {
          title: inputs.title,
          body: inputs.body,
          id: id,
        })
        .then((response) => console.log(response));

      setInputs({ title: "", body: "" });
      toast.success("Your Task is Added!");
    } else {
      setTasks([...tasks, inputs]);
      setInputs({ title: "", body: "" });
      toast.success("Your Task is Added!");
      toast.error("Your task is not saved ! Please sign Up Fist");
    }
  };

  const deleteTask = async (TaskId) => {
    const id = sessionStorage.getItem("id"); // <-- getting id
    if (id) {
      await axios
        .delete(`${window.location.origin}/api/v2/deleteTask/${TaskId}`, {
          data: { id },
        })
        .then(() => toast.success("Task Deleted!"));
    } else {
      toast.error("Please SignUp First");
    }
  };

  const updateTask = async () => {
    if (!inputs.title.trim() || !inputs.body.trim()) {
      toast.error("Fields cannot be empty!");
      return;
    }

    const taskId = tasks[editIndex]?._id;
    if (!taskId) return;

    try {
      const { data } = await axios.put(
        `${window.location.origin}/api/v2/updateTask/${taskId}`, 
        {
          title: inputs.title,
          body: inputs.body,
        }
      );

      // Update state with the new task
      setTasks(tasks.map((t, i) => (i === editIndex ? data.task : t)));
      setInputs({ title: "", body: "" });
      setEditIndex(null);
      toast.success("Task Updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("id");  
    if (id) {
      const fetch = async () => {
        await axios
          .get(`${window.location.origin}/api/v2/getTasks/${id}`) 
          .then((response) => setTasks(response.data.list));
      };
      fetch();
    } else {
      toast.error("Please SignUp First");
    }
  }, [addTask]); 

  return (
    <div className="task-page">
      <ToastContainer theme="dark" position="bottom-right" />

      <div className="task-container">
        <h1 className="task-title">
          Task <span>Manager</span>
        </h1>
        <p className="task-subtitle">
          Keep track of your goals, notes, and progress easily. Add detailed
          tasks with a title and description. Edit, update, or mark them
          complete.
        </p>

        <div className="task-input-section">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="task-input"
            value={inputs.title}
            onChange={handleChange}
          />
          <textarea
            name="body"
            placeholder="Task Description..."
            className="task-body"
            value={inputs.body}
            onChange={handleChange}
          />
          <button className="btn-add" onClick={addTask}>
            + Add Task
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((task, i) => (
            <TaskCard
              key={i}
              title={task.title}
              body={task.body}
              id={task._id}
              onEdit={() => {
                setEditIndex(i);
                setInputs(task);
              }}
              onDelete={() => deleteTask(task._id)}
            />
          ))}
        </ul>
      </div>

      {/* Update Popup */}
      {editIndex !== null && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2 className="popup-title">Update Task</h2>
            <input
              type="text"
              name="title"
              className="task-input"
              placeholder="Edit Title"
              value={inputs.title}
              onChange={handleChange}
            />
            <textarea
              name="body"
              className="task-body"
              placeholder="Edit Description..."
              value={inputs.body}
              onChange={handleChange}
            />
            <div className="popup-buttons">
              <button className="btn-add" onClick={updateTask}>
                Save
              </button>
              <button className="btn-cancel" onClick={() => setEditIndex(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;