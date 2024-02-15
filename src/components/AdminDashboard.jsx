import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './redux/UserSlice'
import { GET_ALL_CUSTOMER } from '../constant/Endpoint';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import Navbar from './navbar/Navbar';

const AdminDashboard = () => {

    const user = useSelector(selectUser);
    const [customerList, setCustomerList] = useState([])
    // const [isLoading, setIsLoading] = useState(false)

    console.log(user)

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
        <div className='col-md-4 container'>
            <Collapsible trigger={customer.firstName}>
                <p>id:{customer.id}</p>
                <p>gender: {customer.gender}</p>
                <p>birthdate: {customer.birthDate}</p>
                <p>address: {customer.address}</p>
                <p>email: {customer.userCredential.email}</p>
            </Collapsible>
            
        </div>
    ));

  return (
    <div>
        <Navbar />
        <p style={{margin:20, textAlign: 'center', fontSize:25, fontWeight: 'bold'}}>Welcome, <span style={{color: 'green'}}>{user.firstName}</span></p>
        <p style={{marginBottom: -5, textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>{customerList.length}</p>
        <p style={{marginBottom:25, textAlign: 'center'}}>{"Registered Users"}</p>
        <div style={{textAlign: 'center'}}>{displayCustomer}</div>
    </div>
  )
}

export default AdminDashboard