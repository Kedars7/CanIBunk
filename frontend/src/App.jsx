import React from 'react'
import Signup from './pages/Signup';
import Login from './pages/Login';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddLecture from './pages/AddLecture';
import SubjectView from './pages/SubjectView';
import AddSubject from './pages/AddSubject';
import Home from './pages/Home';
import Landing from './pages/Landing';
import {Toaster} from 'react-hot-toast';


const App = () => {
  return (
    <div>

    <div className="bg-blobs absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div
          className="blob1 absolute w-[500px] h-[500px] top-[-150px] left-[-150px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(199, 218, 255, 0.5) 0%, rgba(255,255,255,0) 70%)",
          }}
        ></div>
        <div
          className="blob2 absolute w-[600px] h-[600px] bottom-[-200px] right-[-200px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(230, 217, 255, 0.8) 0%, rgba(255,255,255,0) 70%)",
          }}
        ></div>
      </div>

      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addlecture' element={<AddLecture/>}/>
        <Route path='/subjectview/:id' element={<SubjectView/>}/>
        <Route path='/addsubject' element={<AddSubject/>}/>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;