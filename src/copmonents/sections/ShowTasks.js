import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardText, Button, Col, Row, Input
  ,FormGroup,InputGroup} from 'reactstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask } from '../../Features/TaskSlice';

const ShowTasks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const tasks = useSelector((state) => state.tasks.Task);
  const user = useSelector((state) => state.users.user.user);

  const incompleteTasks = tasks ? tasks.filter((task) => !task.completed && task.user === user) : [];

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;
  const totalPages = Math.ceil(incompleteTasks.length / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const filteredTasks = incompleteTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [confirmTaskId, setConfirmTaskId] = useState(null);

  const handleConfirm = (taskId) => {
    setConfirmTaskId(taskId);
  };

  const handleTaskCompletion = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, completed: true };
      dispatch(updateTask({ id: taskId, taskData: updatedTask }));
    }
    setConfirmTaskId(null);
  };

  const handleCancel = () => {
    setConfirmTaskId(null);
  };

  const paginationRange = () => {
    const range = [];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(start + 2, totalPages);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  
  return (
    <section className="services">
      <h1 className="mt-5 mb-4 text-center">To Do Tasks</h1>
      <div className="container">
      <Row className="mb-4 justify-content-center">
        <Col md="6">
          <div className="d-flex align-items-center">
            <FormGroup className="w-100">
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Search tasks by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="shadow-sm"
                />
                <Button 
                style={{ background: '#2c5f6e' }}
                className="ms-2 shadow-sm" disabled>
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </FormGroup>
          </div>
        </Col>
      </Row>
        <Row className="mt-5">
          {currentTasks.map((task) => (
            <Col md="4" sm="6" xs="12" key={task._id}>
              <Card className="modern-card shadow-lg mb-4">
                <div className="card-title-modern">{task.title}</div>
                <CardBody>
                  <p className="date-modern">
                    <span>Due Date:</span> {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <CardText className="card-text-modern">{task.details}</CardText>
                  <div className="task-state d-flex align-items-center">
                    {confirmTaskId === task._id ? (
                      <div className="confirmation-message">
                        <p>Are you sure you want to mark this task as done?</p>
                        <Button
                          color="success"
                          onClick={() => handleTaskCompletion(task._id)}
                          className="me-2"
                        >
                          Yes
                        </Button>
                        <Button color="danger" onClick={handleCancel}>
                          No
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span style={{ fontSize: '19px', color: '#2c5f6e' }}>Mark as Done</span>
                        <i
                          className="bi bi-square task-icon ms-2"
                          onClick={() => handleConfirm(task._id)}
                          style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'gray' }}
                        />
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        {filteredTasks.length === 0 && (
          <p className="text-center mt-4">No tasks found for the given search term.</p>
        )}
        {tasks == {} ? '' : (
          <Row className="mt-4 justify-content-center">
            <div className="pagination">
              <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                <i className="bi bi-caret-left-fill"></i>
              </Button>
              {paginationRange().map((pageNumber) => (
                <Button
                  key={pageNumber}
                  className={`mx-1 ${currentPage === pageNumber ? 'active' : ''}`}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ))}
              <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                <i className="bi bi-caret-right-fill"></i>
              </Button>
            </div>
          </Row>
        )}
      </div>
    </section>
  );
};

export default ShowTasks;
