import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './redux/UserSlice'
import Navbar from './Navbar';
import { GET_ALL_CUSTOMER } from '../constant/Endpoint';
import axios from 'axios';
import { AnimationOnScroll } from 'react-animation-on-scroll';

const AdminDashboard = () => {

    const user = useSelector(selectUser);
    const [customerList, setCustomerList] = useState([])
    // const [isLoading, setIsLoading] = useState(false)

    const getCustomerList = async() => {
        await axios
            .get(GET_ALL_CUSTOMER)
            .then(res => setCustomerList(res.data.data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getCustomerList()
    }, [])

    console.log(customerList)

    const displayCustomer = customerList.map((customer) => (
        <div>
            <p>{customer.firstName}</p>
        </div>
    ));

  return (
    <div>
        <Navbar />
        <h4 style={{margin:50, textAlign: 'center'}}>Welcome, {user.firstName}</h4>
        <h1 style={{margin:10, textAlign: 'center'}}>{customerList.length}</h1>
        <p style={{textAlign: 'center'}}>{"Registered Users"}</p>
        <div style={{textAlign: 'center'}}>{displayCustomer}</div>
    </div>
  )
}

export default AdminDashboard