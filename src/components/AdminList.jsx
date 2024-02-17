import React, { useEffect, useState } from 'react'
import { DELETE_ADMIN, GET_ALL_ADMIN } from '../constant/Endpoint';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminList = () => {

    const [adminList, setAdminList] = useState([])
    const [searchAdminResult, setSearchAdminResult] = useState(null)
    const [isSearchingAdmin, setIsSearchingAdmin] = useState(false)

    const getAdminList = async() => {
        await axios
            .get(GET_ALL_ADMIN)
            .then(res => setAdminList(res.data.data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getAdminList()
    }, [])

    const displayEmptyList = (
        <div className="text-center">
            <h2>List is Empty</h2>
        </div>
    )

    const displayAdminList = adminList.map((admin) => (
        <tr key={admin.id}>
            <td>{admin.id}</td>
            <td>{admin.fullName}</td>
            <td>{admin.phoneNumber}</td>
            <td>{admin.email}</td>
            <td><button onClick={() => {
                    if (admin) {
                        Swal.fire({
                            title: "Are you sure?",
                            text: `About to Delete: ${admin.fullName}`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                          }).then((result) => {
                            if (result.isConfirmed) {
                                axios.delete(DELETE_ADMIN + admin.id)
                                    .then(res => {
                                        console.log(res.data.message)
                                        Swal.fire({
                                            title: "Deleted!",
                                            text: res.data.message,
                                            icon: "success"
                                        })
                                        getAdminList();
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

    const displaySearchAdminResult = isSearchingAdmin && searchAdminResult.map((admin) => (
        <tr key={admin.id}>
            <td>{admin.id}</td>
            <td>{admin.fullName}</td>
            <td>{admin.phoneNumber}</td>
            <td>{admin.email}</td>
            <td><button onClick={() => {
                    if (admin) {
                        Swal.fire({
                            title: "Are you sure?",
                            text: `About to Delete: ${admin.fullName}`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                          }).then((result) => {
                            if (result.isConfirmed) {
                                axios.delete(DELETE_ADMIN + admin.id)
                                    .then(res => {
                                        console.log(res.data.message)
                                        Swal.fire({
                                            title: "Deleted!",
                                            text: res.data.message,
                                            icon: "success"
                                        })
                                        getAdminList();
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

    const displayAdminTable = (
        <div className="container">
            <div className="row">
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th scope='col'>Id</th>
                            <th scope='col'>Full name</th>
                            <th scope='col'>Phone number</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isSearchingAdmin ? displaySearchAdminResult : displayAdminList}
                    </tbody>
                </table>
            </div>
        </div>
    )

    const handleAdminSearch = (e) => {
        setIsSearchingAdmin(true)
        const input = e.target.value.toLowerCase().trim()
        const filteredAdmin = adminList.filter(admin => {
            return admin.fullName.includes(input)
        })
        setSearchAdminResult(filteredAdmin)
        if (input === "") setIsSearchingAdmin(false)
    }

  return (
        <>
            <p style={{marginBottom: -5, textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>{adminList.length}</p>
            <p style={{marginBottom:25, textAlign: 'center'}}>{"Registered Admin"}</p>
            <div className='container justify-content-center align-items-center d-flex mb-4'>    
                <input style={{textAlign:'center'}} type='text' placeholder='Search by name' onChange={handleAdminSearch}/>  
            </div>
            <div style={{textAlign: 'center'}}>{isSearchingAdmin ? displayAdminTable : adminList.length == 0 ? displayEmptyList : displayAdminTable}</div>
        </> 
  )
}

export default AdminList