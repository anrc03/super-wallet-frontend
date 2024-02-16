import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import Register from './pages/register/Register.jsx'
import { useSelector } from 'react-redux'
import { selectUser } from './components/redux/UserSlice.js'
import { useEffect, useState } from 'react'
import About from './pages/about/About.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import Home from './pages/home/Home.jsx'
import CurrencyConverter from './pages/CurrencyConverter.jsx'
import Service from './pages/Service.jsx'

function App() {

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(null);
  

  useEffect(() => {
    if(user && location.pathname == "/login") {
      navigate("/home")
    }  
  }, [user])

  useEffect(() => {
    if(user && location.pathname == "/admin/login") {
      navigate("/admin/dashboard")
    }  
  }, [user])

  useEffect(() => {
    if (user != null) setRole(user.role)
  })

  const ADMIN_PAGE = (    
    <>
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
    </>
  )

  const CUSTOMER_PAGE = (
    <>
      <Route path='/home' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path="/currency-converter" element={<CurrencyConverter />} />
      <Route path="/service" element={<Service />} />
    </>
  )

  const GENERAL_ACCESS = (
    <>
      <Route path='/home' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path="/service" element={<Service />} />
      <Route path="/currency-converter" element={<CurrencyConverter />} />

    </>
  )

  return (
    <div>
      <Routes>
        <Route index element={<div><Home /></div>} />
        {user? 
          role === "ROLE_CUSTOMER"? 
            <>
              {CUSTOMER_PAGE}
            </>
            :
            <>
              {ADMIN_PAGE}
              
          </>
        :
          <>
            {GENERAL_ACCESS}
          </>
        }      
      </Routes>
    </div>
  )
}

export default App;
