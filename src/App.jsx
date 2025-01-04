import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
// import UserStatus from './components/UserStatus';

// import Navbar from './components/Navbar';
import Home from './components/Home';
import SinglePageForm from './components/SinglePageForm';
import AdminRouter from './components/admin/AdminRouter';


const App = () => {

  return (
    <Router>
      <div className="font-[Poppins]">
        {/* <Navbar/> */}


        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/applynow' element={<SinglePageForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/admin/*' element={<AdminRouter/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
