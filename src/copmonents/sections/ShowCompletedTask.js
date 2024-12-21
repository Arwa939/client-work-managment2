import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardText, Button, Col, Row } from 'reactstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../Features/TaskSlice';

const ShowCompletedTask = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks()); 
  }, [dispatch]);

  // Get tasks from Redux state
  const tasks = useSelector((state) => state.tasks.Task);
  const user = useSelector((state)=>state.users.user.user);
  console.log(tasks);
  console.log(user);
  


  // Add a check to ensure tasks are loaded before applying filter
  const incompleteTasks = tasks ? tasks.filter((task) => task.completed && task.user==user) : [];

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;
  const totalPages = Math.ceil(incompleteTasks.length / tasksPerPage);

  const [doneTasks, setDoneTasks] = useState(Array(incompleteTasks.length).fill(false));

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = incompleteTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...doneTasks];
    updatedTasks[index] = !updatedTasks[index];
    setDoneTasks(updatedTasks);
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
      <h1 className="mt-5 mb-4 text-center">Completed Tasks</h1>
      <div className="container">
        <Row className="mt-5">
          {currentTasks.map((task, index) => {
            const globalIndex = indexOfFirstTask + index;
            return (
              <Col md="4" sm="6" xs="12" key={task._id}>
                <Card className="modern-card shadow-lg mb-4">
                  <div className="card-title-modern">{task.title}</div>
                  <CardBody>
                    <p className="date-modern">
                      <span>Due Date:</span> 
                      <del>{new Date(task.dueDate).toLocaleDateString()}</del>
                    </p>
                    <CardText className="card-text-modern">{task.details}</CardText>
                    <div className="task-state d-flex align-items-center">
                      <span style={{fontSize:'19px', color:'green'}}> Completed  </span>
                      <i 
                        className='bi bi-check-square task-icon ms-2'
                        style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'green' }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
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
      </div>
    </section>
  );
};

export default ShowCompletedTask;
