import React, { useEffect, useState } from 'react'
import { BASE_ADMIN } from '../constant/Endpoint';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';

const AdminList = () => {

    const [adminList, setAdminList] = useState([])
    const [searchAdminResult, setSearchAdminResult] = useState(null)
    const [isSearchingAdmin, setIsSearchingAdmin] = useState(false)
    const [showForm, setShowForm] = useState(false);

    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = () => setShowForm(true);

    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
    })

    const getAdminList = async() => {
        await axios
            .get(BASE_ADMIN)
            .then(res => setAdminList(res.data.data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getAdminList()
    }, [])

    const handleUpdateAdmin = (e) => {
        e.preventDefault()
        if (formData.id && formData.fullName && formData.email && formData.password && formData.phoneNumber && formData.address) {
            axios.put(BASE_ADMIN, {
                id: formData.id,
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
            }).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Admin succesfully updated!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                handleCloseForm();
                getAdminList();
            }).catch(err => {
                console.log(err)
                Swal.fire({
                    icon: "error",
                    title: err.message,
                    showConfirmButton: false,
                    timer: 1000
                });
            }) 
        } else {
            Swal.fire({
                icon: "error",
                title: "Fields cannot be empty",
                showConfirmButton: false,
                timer: 1000
            });
        }
    }

    const displayEmptyList = (
        <div className="text-center">
            <h2>List is Empty</h2>
        </div>
    )

    const displayAdminList = adminList.map((admin) => (
        <tr key={admin.id}>
            <td>{admin.id}</td>
            <td>{admin.role}</td>
            <td>{admin.fullName}</td>
            <td>{admin.phoneNumber}</td>
            <td>{admin.email}</td>
            <td>
                <button type="button" className="btn btn-success m-1" onClick={() => {
                    handleShowForm()
                    setFormData({
                        ...formData, 
                        id: admin.id, 
                        fullName: admin.fullName, 
                        phoneNumber: admin.phoneNumber, 
                        email: admin.email,
                        address: admin.address,
                    })
                }}>
                    <i className="bi bi-pencil-square"></i>
                </button>
                
                <button type="button" className="btn btn-success m-1" onClick={() => {
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
                                axios.delete(BASE_ADMIN + "/" + admin.id)
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
            <td>{admin.role}</td>
            <td>{admin.fullName}</td>
            <td>{admin.phoneNumber}</td>
            <td>{admin.email}</td>
            <td>
                <button type="button" className="btn btn-success m-1" onClick={() => {
                    handleShowForm()
                    setFormData({
                        ...formData, 
                        id: admin.id, 
                        fullName: admin.fullName, 
                        phoneNumber: admin.phoneNumber, 
                        email: admin.email,
                        address: admin.address,
                    })
                }}>
                    <i className="bi bi-pencil-square"></i>
                </button>

                <button type="button" className="btn btn-success" onClick={() => {
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
                                axios.delete(BASE_ADMIN + "/" + admin.id)
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
                            <th scope='col'>Role</th>
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
            <Modal
            show={showForm}
            onHide={handleCloseForm}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title>Update Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className='mb-2'>
                        <label>Id</label>
                        <input type='text' className='form-control' style={{backgroundColor:'#D3D3D3', fontWeight:'bold'}} value={formData.id} readOnly/>
                    </div>
                    <div className='mb-2'>
                        <label>Fullname</label>
                        <input type='text' className='form-control' value={formData.fullName} placeholder="Enter fullname"
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}/>
                    </div>
                    <div className='mb-2'>
                        <label>Email</label>
                        <input type='email' className='form-control' value={formData.email} placeholder="Enter email"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
                    </div>
                    <div className='mb-2'>
                        <label>Password</label>
                        <input type="password" id="setPassword" name="password" className="form-control" placeholder="Enter new password" 
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>                                                
                    </div>
                    <div className='mb-2'>
                        <label>Phone Number</label>
                        <PhoneInput
                            className="phone-input"
                            country={"id"}
                            placeholder='Enter your phone number'
                            value={formData.phoneNumber}
                            onlyCountries={['id', 'us', 'cn', 'jp', 'sg', 'au', 'sa', 'kr', 'gb']}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Address</label>
                        <input type="text" name="address" className="form-control" value={formData.address} placeholder="Enter address" 
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseForm}>
                Cancel
            </Button>
            <Button variant="success" onClick={handleUpdateAdmin}>Update</Button>
            </Modal.Footer>
        </Modal>
        </> 
  )
}

export default AdminList