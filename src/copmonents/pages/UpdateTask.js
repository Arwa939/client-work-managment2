import React, { useState, useEffect } from "react";
import "../css/Admin.css";
import update from "../assets/update.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask } from "../../Features/TaskSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import LoadingIcon from "../sections/LoadingIcon";


const UpdateTask = () => {
    const { id } = useParams(); // Get the task ID from URL params
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tasks = useSelector((state) => state.tasks.Task); // Get tasks from Redux state
    const [taskData, setTaskData] = useState({
        title: "",
        dueDate: "",
        details: "",
        user: "", // Include user field for the backend
    });

    useEffect(() => {
        // Fetch tasks on component mount
        if (tasks.length === 0) {
            dispatch(fetchTasks());
        } else {
            const taskToEdit = tasks.find((task) => task._id === id);
            if (taskToEdit) {
                setTaskData({
                    title: taskToEdit.title,
                    dueDate: taskToEdit.dueDate.split("T")[0],
                    details: taskToEdit.details,
                    user: taskToEdit.user, // Populate user field
                });
            }
        }
    }, [tasks, id, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        dispatch(updateTask({ id, taskData }))
            .unwrap()
            .then(() => {
                alert("Task updated successfully");
                navigate(-1); // Go back to the previous page
            })
            .catch((err) => {
                alert(`Failed to update task: ${err}`);
            });
    };
    const user2 = useSelector((state) => state.users.user);
    if (Object.keys(user2).length === 0) {
      return (
        <div className="admin-panel d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="text-center">
            <LoadingIcon />
            <h2>Please log in again to access the WebApp.</h2>
            <Button color="dark" onClick={() => navigate('/')}>
              Go to Login
            </Button>
          </div>
        </div>
      );
    }

    return (
        <div>
            <div className="container-admin">
                <div className="left-section-admin">
                    <h2>Update Task</h2>

                    <label className="label">Title:</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="bi bi-sticky-fill"></i>
                            </span>
                        </div>
                        <input
                            type="text"
                            id="text"
                            name="title"
                            value={taskData.title}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Title .."
                        />
                    </div>

                    <label className="label">Due Date:</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="bi bi-calendar-fill"></i>
                            </span>
                        </div>
                        <input
                            type="date"
                            id="date"
                            name="dueDate"
                            value={taskData.dueDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <label className="label">Task Details:</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="bi bi-pencil-fill"></i>
                            </span>
                        </div>
                        <textarea
                            id="task"
                            name="details"
                            value={taskData.details}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter the task .."
                            rows="4"
                        ></textarea>
                    </div>

                    <button className="login-btn-admin" onClick={handleSubmit}>
                        Submit
                    </button>
                    <br />
                    <a href="#" onClick={() => navigate(-1)} className="back-link">
                        ← Back to previous page
                    </a>
                </div>

                <div className="right-section-admin">
                    <img src={update} alt="Update Task Illustration" />
                </div>
            </div>
        </div>
    );
};

export default UpdateTask;
