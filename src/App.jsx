import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import RegisterCustomer from './components/Register.jsx'
import { useSelector } from 'react-redux'
import { selectUser } from './components/redux/UserSlice.js'
import { useEffect } from 'react'

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
          </>
        :
          <>
            <Route path='/home' element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<RegisterCustomer />} />
          </>
        }      
      </Routes>
    </div>
  )
}

export default App
