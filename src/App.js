import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './copmonents/pages/Home';
import Login from './copmonents/pages/Login';
import Register from './copmonents/pages/Register';
import Contact from './copmonents/pages/Contact';
import Admin from './copmonents/pages/Admin';
import UpdateTask from './copmonents/pages/UpdateTask';
import DeleteTasks from './copmonents/pages/DeleteTasks';
import CompletedTasks from './copmonents/pages/CompletedTasks';


function App() {
  
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/'           element={<Login/>}/>
    <Route path='/login'           element={<Login/>}/>
    <Route path='/home'       element={<Home/>}/>
    <Route path='/register'   element={<Register/>}/>
    <Route path='/contact'    element={<Contact/>}/>
    <Route path='/completedTasks' element={<CompletedTasks/>}/>
    <Route path='/admin'      element={<Admin/>}/>
    <Route path='/user-details/:user' element={<DeleteTasks/>}/>
    <Route path='/update-task/:id' element={<UpdateTask/>}/>

  </Routes>
  </BrowserRouter>
  );
}

export default App;
