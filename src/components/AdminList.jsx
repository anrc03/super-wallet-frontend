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
    const [searchInput, setSearchInput] = useState("");

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

    const getAdminList = async () => {
        await axios
            .get(BASE_ADMIN)
            .then(res => setAdminList(res.data.data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getAdminList()
    }, [])

    const handleDelete = (id, fullName) => {
        Swal.fire({
            title: "Are you sure?",
            text: `About to delete : ${fullName}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(BASE_ADMIN + "/" + id)
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

    const handleClickEdit = (id, fullName, phoneNumber, email, address) => {
        handleShowForm()
        setFormData({
            ...formData,
            id: id,
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            address: address,
        })
    }

    const handleUpdateAdmin = (e) => {
        e.preventDefault()
        if (formData.id && formData.fullName && formData.email && formData.phoneNumber && formData.address) {
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
            <div className="d-flex justify-content-center empty">
                <img src="./src/assets/images/Empty.png" alt="Empty Picture" />
            </div>
            <p className='empty-info'>The admin list is empty</p>
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
                <button type="button" className="btn btn-green m-1" onClick={() => {
                    handleClickEdit(admin.id, admin.fullName, admin.phoneNumber, admin.email, admin.address)
                }}>
                    <i className="bi bi-pencil-square"></i>
                </button>

                <button type="button" className="btn btn-red m-1" onClick={() => handleDelete(admin.id, admin.fullName)}>
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
                <button type="button" className="btn btn-green m-1" onClick={() => {
                    handleClickEdit(admin.id, admin.fullName, admin.phoneNumber, admin.email, admin.address)
                }}>
                    <i className="bi bi-pencil-square"></i>
                </button>

                <button type="button" className="btn btn-red m-1" onClick={() => handleDelete(admin.id, admin.fullName)}>
                    <i className="bi bi-trash3"></i>
                </button>
            </td>
        </tr>
    ));

    const displayAdminTable = (
        <div className="container">
        <div className="row">
            {isSearchingAdmin && searchAdminResult.length === 0 ? (
                <>
                <div className="image-search d-flex justify-content-center">
                <img style={{ width: '200px' }} src="./../src/assets/images/Search.png" alt="Search Picture" />
              </div>
                <p style={{ textAlign: 'center', fontSize: '20px', color: '#6f9459', marginTop: '5px' }}>Sorry, your search "{searchInput}" was not found</p>
                </>
            ) : (
                <table className="content-table">
                    <thead>
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
            )}
        </div>
    </div>
    )

    const handleAdminSearch = (e) => {
        setIsSearchingAdmin(true);
        const input = e.target.value.toLowerCase().trim();
        setSearchInput(input);
        const filteredAdmin = adminList.filter(admin => {
            return admin.fullName.toLowerCase().trim().includes(input) || admin.email.toLowerCase().trim().includes(input);
        });
        setSearchAdminResult(filteredAdmin);
        if (input === "") setIsSearchingAdmin(false);
    }
    
    return (
        <>
            <p style={{ marginBottom: -5, textAlign: 'center', fontWeight: 'bold', fontSize: 40, marginTop: 4 }}>{adminList.length}</p>
            <p style={{ marginBottom: 15, textAlign: 'center', fontSize: 20, color: '#6f9459' }}>Registered Admin</p>
            <div className='container justify-content-center align-items-center d-flex mb-4 search-input input-group'>
                <input type='text' placeholder='Search by full name' onChange={handleAdminSearch} />
                <div className="input-group-append">
                    <span className="input-group-text search-icon">
                        <i class="bi bi-search"></i>
                    </span>
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>{isSearchingAdmin ? displayAdminTable : adminList.length == 0 ? displayEmptyList : displayAdminTable}</div>
            <Modal
                show={showForm}
                onHide={handleCloseForm}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header className='admin-close' closeButton>
                    <Modal.Title>Update Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-update'>
                        <div className='mb-2'>
                            <label className='mb-2'>Id</label>
                            <input type='text' className='form-control' style={{ backgroundColor: '#95b79c', color: '#fff', fontWeight: 'bold' }} value={formData.id} readOnly />
                        </div>
                        <div className='mb-2'>
                            <label className='mb-2'>Full name</label>
                            <input type='text' className='form-control' value={formData.fullName} placeholder="Enter full name"
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                        </div>
                        <div className='mb-2'>
                            <label className='mb-2'>Email</label>
                            <input type='email' className='form-control' value={formData.email} placeholder="Enter email"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className='mb-2'>
                            <label className='mb-2'>Password</label>
                            <input type="password" id="setPassword" name="password" className="form-control" placeholder="Enter new password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </div>
                        <div className='mb-2'>
                            <label className='mb-2'>Phone Number</label>
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
                            <label className='mb-2'>Address</label>
                            <input type="text" name="address" className="form-control" value={formData.address} placeholder="Enter address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-red' onClick={handleCloseForm}>
                        Cancel
                    </Button>
                    <Button className='btn-admin' onClick={handleUpdateAdmin}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminList