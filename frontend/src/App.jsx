import { Routes, Route, useLocation } from 'react-router-dom';
import Login from "./pages/Login"
import Register from './pages/Register';
import Home from './pages/Home';
import Task from './pages/MyTask';
import Project from './pages/Project';
import ProjectPage from './sub-pages/ProjectPage';
import Message from './pages/Message';
import Report from './pages/Report';

function App() {
  return(
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/task' element={<Task/>}/>
        <Route path='/projects' element={<Project/>}/>
        <Route path='/projectPage/:id' element={<ProjectPage/>}/>
        <Route path='/messages' element={<Message/>}/>
        <Route path='/reports' element={<Report/>}/>
      </Routes>
    </>
  )
 
}

export default App
