import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import RegisterCustomer from './components/Register.jsx'
import { useSelector } from 'react-redux'
import { selectUser } from './components/redux/UserSlice.js'
import { useEffect } from 'react'
import About from './components/About.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'

function App() {

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(user && location.pathname == "/login") {
      navigate("/home")
    }  
  }, [user])

  return (
    <div>
      <Routes>
        <Route index element={<div><Home /></div>} />
        {user? 
          <>
            <Route path='/home' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/dashboard-admin' element={<AdminDashboard />} />
          </>
        :
          <>
            <Route path='/home' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<RegisterCustomer />} />
          </>
        }      
      </Routes>
    </div>
  )
}

export default App
