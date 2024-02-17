import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './redux/UserSlice'
import CustomerList from './CustomerList';

const AdminDashboard = () => {

    const user = useSelector(selectUser);

  return (
    <div>
        <p style={{margin:20, textAlign: 'center', fontSize:25, fontWeight: 'bold'}}>Welcome, <span style={{color: 'green'}}>{user.email.split("@")[0]}</span></p>
        <CustomerList/>
    </div>
  )
}

export default AdminDashboard