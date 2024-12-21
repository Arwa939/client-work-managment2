import React from 'react';
import '../css/Home.css';
import ShowTasks from '../sections/ShowTasks';
import Header from '../sections/Header';
import logo from '../assets/logo.png';
import Footer from '../sections/Footer';
import Timer from '../sections/Timer';
import TemporaryNote from '../sections/TemporaryNote ';
import {Row,Col,Button} from 'reactstrap';
import { useSelector } from 'react-redux';
import LoadingIcon from '../sections/LoadingIcon';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let NavTo =useNavigate();
  const user = useSelector((state) => state.users.user);
  if (Object.keys(user).length === 0) {
    return (
        <div className="admin-panel d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center">
                <LoadingIcon/>
                <h2>Please log in again to access the WebApp.</h2>               
                <Button color="dark" onClick={()=>NavTo('/')}>
                    Go to Login
                </Button>
            </div>
        </div>
    );
}
  return (
    <div className='container1'>
      <Header />
      <section className="header">
        <div className="container1">
          <h1>Work Management System</h1>
          <img src={logo} alt="Profile" className="rounded-circle" width="400px" height="400px" />
          <p>Work space</p>
          <p>Here is your space in which you will find some tasks to do</p>
        </div>
      </section>
      <div className="content-row">
        <div className="column1">
         <ShowTasks />
        </div>
        <div className="column2">
        </div>
        <Row className="align-items-center">
          <Col xs="12" md="4" className="px-md-5 px-3">
            <Timer />
          </Col>
          <Col xs="12" md="8" className="px-md-5 px-3">
            <TemporaryNote />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
