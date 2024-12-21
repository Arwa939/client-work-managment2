import React from 'react'
import '../css/Contact.css'
import Footer from '../sections/Footer'
import Header from '../sections/Header'
import ShowCompletedTask from '../sections/ShowCompletedTask'
import { useSelector } from 'react-redux';
import LoadingIcon from '../sections/LoadingIcon';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap'
import Sliderimage from '../sections/Sliderimage';


const CompletedTasks = () => {

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
    <div className='main-contact'>
    <Header/>
    <Sliderimage/>
    <ShowCompletedTask/>
    <Footer/>
    </div>
  )
}

export default CompletedTasks
