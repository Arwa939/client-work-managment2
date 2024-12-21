import React, { useState, useEffect } from "react";
import "../css/DeleteTasks.css";
import { Card, ModalHeader, ModalBody, Button, Modal } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../../Features/TaskSlice";
import LoadingIcon from "../sections/LoadingIcon";

const DeleteTasks = () => {
    const { user } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dfimg = 'https://static.vecteezy.com/system/resources/thumbnails/013/360/247/small/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg';

    const tasks = useSelector((state) => state.tasks.Task);

    const [currentTasks, setCurrentTasks] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10;
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const userdata = userDetails?.tasks?.[0]?.userdata?.[0] || {};
    const countryCode = userdata?.country_code || "N/A";

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const filteredTasks = tasks.filter((task) => task.user === user);
            setUserDetails({ tasks: filteredTasks });
            updateCurrentTasks(filteredTasks, 1);
        }
    }, [tasks, user]);

    const updateCurrentTasks = (tasksList, pageNumber) => {
        const startIndex = (pageNumber - 1) * tasksPerPage;
        const endIndex = startIndex + tasksPerPage;
        setCurrentTasks(tasksList.slice(startIndex, endIndex));
        setCurrentPage(pageNumber);
    };

    const paginate = (pageNumber) => {
        if (userDetails) {
            updateCurrentTasks(userDetails.tasks, pageNumber);
        }
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    const confirmDeleteTask = (taskId) => {
        setTaskToDelete(taskId);
        setShowConfirmModal(true);
    };

    const handleDeleteConfirmation = () => {
        if (!taskToDelete) return;

        dispatch(deleteTask(taskToDelete)).then(() => {
            const updatedTasks = userDetails.tasks.filter((task) => task._id !== taskToDelete);
            setUserDetails({ tasks: updatedTasks });
            updateCurrentTasks(updatedTasks, currentPage);
        });

        setShowConfirmModal(false);
        setTaskToDelete(null);
    };

    const handleEditTask = (taskId) => {
        navigate(`/update-task/${taskId}`); // Navigate to the update task page with the task ID
    };

    const ToAddTask = () => {
        navigate(-1);
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
        <div className="admin-panel">
            <div className="sidebar">
                <div className="profile text-center mb-4">
                    <img src={userdata?.imgUrl || dfimg} alt="Profile" className="rounded-circle mb-2" />
                    <p className="user-role">Staff</p>
                    {userdata?.gender === "Male" ? "Mr." : "Ms."} {user}
                </div>
                <ul className="menu">
                    <li className="menu-item bi bi-list-task" onClick={ToAddTask}>
                        &nbsp;Add Task
                    </li>
                    <li className="menu-item bi bi-person-lines-fill">&nbsp;Staff Information</li>
                    <Card>
                        <div className="staff-info mt-4 p-3 text-dark border">
                            {userDetails ? (
                                <>
                                    <p>
                                        <i className="bi bi-globe-americas"></i>&nbsp;&nbsp;
                                        <strong>Country:</strong> {userdata.country || "Unknown"} ({countryCode})
                                    </p>
                                    <p>
                                        <i className="bi bi-geo-alt-fill"></i>&nbsp;&nbsp;
                                        <strong>City:</strong> {userdata.city || "Unknown"}
                                    </p>
                                    <p>
                                        <i className="bi bi-clock"></i>&nbsp;&nbsp;
                                        <strong>Timezone:</strong> {userdata.timezone || "Unknown"}
                                    </p>
                                    <p>
                                        <i className="bi bi-pc-display"></i>&nbsp;&nbsp;
                                        <strong>ISP:</strong> {userdata.isp || "Unknown"}
                                    </p>
                                </>
                            ) : (
                                <p>Loading user details...</p>
                            )}
                        </div>
                    </Card>
                </ul>
            </div>
            <div className="col">
                <div className="main-content">
                    <h3>Staff Tasks</h3>
                    {currentTasks.length > 0 ? (
                        <>
                            <table className="table table-hover">
                                <thead className="thead-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Task Title</th>
                                        <th>Due Date</th>
                                        <th>Task Details</th>
                                        <th>State</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTasks.map((task, index) => (
                                        <tr key={task._id}>
                                            <th>{(currentPage - 1) * tasksPerPage + index + 1}</th>
                                            <td>{task.title}</td>
                                            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    className="btn p-0 text-primary"
                                                    onClick={() => handleTaskClick(task)}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className={`${task.completed ? "success" : "warning"}`}
                                                    disabled
                                                >
                                                    {task.completed ? "Completed" : "Incomplete"}
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn-edit bi bi-pencil-square"
                                                    onClick={() => handleEditTask(task._id)}
                                                ></button>
                                                &nbsp;
                                                <button
                                                    className="btn-delete bi bi-x-circle"
                                                    onClick={() => confirmDeleteTask(task._id)}
                                                ></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <nav>
                                <ul className="pagination">
                                    {[...Array(Math.ceil(userDetails.tasks.length / tasksPerPage))].map((_, i) => (
                                        <li
                                            key={i}
                                            className={`page-item ${
                                                currentPage === i + 1 ? "active" : ""
                                            }`}
                                        >
                                            <Button
                                                onClick={() => paginate(i + 1)}
                                                className="page-link"
                                            >
                                                {i + 1}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </>
                    ) : (
                        <p>No tasks available for this user.</p>
                    )}
                </div>
            </div>
            {selectedTask && (
                <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
                    <ModalHeader toggle={() => setShowModal(false)}>Task Details</ModalHeader>
                    <ModalBody>
                        <p>
                            <strong>Details:</strong> {selectedTask.details}
                        </p>
                    </ModalBody>
                </Modal>
            )}
            <Modal isOpen={showConfirmModal} toggle={() => setShowConfirmModal(false)}>
                <ModalHeader toggle={() => setShowConfirmModal(false)}>Confirm Deletion</ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to delete this task?</p>
                    <div className="d-flex justify-content-end">
                        <Button color="danger" onClick={handleDeleteConfirmation}>
                            Delete
                        </Button>
                        <Button
                            color="secondary"
                            onClick={() => setShowConfirmModal(false)}
                            className="ms-2"
                        >
                            Cancel
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default DeleteTasks;
