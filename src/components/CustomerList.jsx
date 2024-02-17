import React, { useEffect, useState } from 'react'
import { BASE_CUSTOMER } from '../constant/Endpoint';
import axios from 'axios';
import Swal from 'sweetalert2';

const CustomerList = () => {

    const [customerList, setCustomerList] = useState([])
    const [searchResult, setSearchResult] = useState(null)
    const [isSearching, setIsSearching] = useState(false)

    const getCustomerList = async() => {
        await axios
            .get(BASE_CUSTOMER)
            .then(res => setCustomerList(res.data.data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getCustomerList()
    }, [])

    const displayEmptyList = (
        <div className="text-center">
            <h2>List is Empty</h2>
        </div>
    )

    const displayCustomer = customerList.map((customer) => (
            <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.firstName + " " + customer.lastName}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.birthDate}</td>
                <td>{customer.gender}</td>
                <td>{customer.address}</td>
                <td>{customer.userCredential.email}</td>
                <td>
                    <button type="button" className="btn btn-success m-1" onClick={() => {}}>
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" className="btn btn-success m-1" onClick={() => {
                        if (customer) {
                            Swal.fire({
                                title: "Are you sure?",
                                text: `About to Delete: ${customer.firstName + " " + customer.lastName}`,
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                              }).then((result) => {
                                if (result.isConfirmed) {
                                    axios.delete(BASE_CUSTOMER + "/" + customer.id)
                                        .then(res => {
                                            console.log(res.data.message)
                                            Swal.fire({
                                                title: "Deleted!",
                                                text: res.data.message,
                                                icon: "success"
                                            })
                                            getCustomerList();
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            Swal.fire({
                                                title: "Delete Failed",
                                                text: err,
                                                icon: "error"
                                            })
                                        })
                                    }
                                });                        
                            }
                        }}>
                            <i className="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>
    ));

    const displaySearchResult = isSearching && searchResult.map((customer) => (
            <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.firstName + " " + customer.lastName}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.birthDate}</td>
                <td>{customer.gender}</td>
                <td>{customer.address}</td>
                <td>{customer.userCredential.email}</td>
                <td>
                    <button type="button" className="btn btn-success m-1" onClick={() => {}}>
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" className="btn btn-success m-1" onClick={() => {
                        if (customer) {
                            Swal.fire({
                                title: "Are you sure?",
                                text: `About to Delete: ${customer.firstName + " " + customer.lastName}`,
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                              }).then((result) => {
                                if (result.isConfirmed) {
                                    axios.delete(BASE_CUSTOMER + "/" + customer.id)
                                        .then(res => {
                                            console.log(res.data.message)
                                            Swal.fire({
                                                title: "Deleted!",
                                                text: res.data.message,
                                                icon: "success"
                                            })
                                            getCustomerList();
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            Swal.fire({
                                                title: "Delete Failed",
                                                text: err,
                                                icon: "error"
                                            })
                                        })
                                    }
                                });                        
                            }
                        }}>
                            <i className="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>
    ));

    const displayTable = (
        <div className="container">
            <div className="row">
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th scope='col'>Id</th>
                            <th scope='col'>Full name</th>
                            <th scope='col'>Phone number</th>
                            <th scope='col'>Birth Date</th>
                            <th scope='col'>Gender</th>
                            <th scope='col'>Address</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isSearching ? displaySearchResult : displayCustomer}
                    </tbody>
                </table>
            </div>
        </div>
    )

    const handleSearch = (e) => {
        setIsSearching(true)
        const input = e.target.value.toLowerCase().trim()
        const filteredCustomer = customerList.filter(customer => {
            const searchFirstName = customer.firstName.toLowerCase();
            const searchLastName = customer.lastName.toLowerCase()
            const searchFullName = searchFirstName + " " + searchLastName
            return searchFirstName.includes(input) || searchLastName.includes(input) || searchFullName.includes(input)
        })
        setSearchResult(filteredCustomer)
        if (input === "") setIsSearching(false)
    }

  return (
        <>
            <p style={{marginBottom: -5, textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>{customerList.length}</p>
            <p style={{marginBottom:25, textAlign: 'center'}}>{"Registered Users"}</p>
            <div className='container justify-content-center align-items-center d-flex mb-4'>    
                <input style={{textAlign:'center'}} type='text' placeholder='Search by name' onChange={handleSearch}/>  
            </div>
            <div style={{textAlign: 'center'}}>{isSearching ? displayTable : customerList.length == 0 ? displayEmptyList : displayTable}</div>
        </> 
  )
}

export default CustomerList