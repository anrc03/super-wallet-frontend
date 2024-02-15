import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import { useSelector } from 'react-redux'
import { selectUser } from './components/redux/UserSlice.js'
import { useEffect } from 'react'
import Register from './pages/register/Register.jsx'
import Home from './pages/home/Home.jsx'
import About from './pages/about/About.jsx'

function App() {

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
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
            <Route path="/about" element={<About />} />
          </>
        :
          <>
            <Route path='/home' element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/about" element={<About />} />
          </>
        }      
      </Routes>
    </div>
  )
}

export default App
