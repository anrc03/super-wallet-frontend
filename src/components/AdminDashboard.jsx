import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './redux/UserSlice'
import { REGISTER_ADMIN } from '../constant/Endpoint';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import Swal from 'sweetalert2';
import LoadSpinner from './LoadSpinner';

const AdminDashboard = () => {

    const user = useSelector(selectUser);

    const [showForm, setShowForm] = useState(false);
    const [role, setRole] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }, []);

    useEffect(() => {
        if (user) setRole(user.role)
    }, [])

    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = () => setShowForm(true);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
    })

    const handleRegister = (e) => {
        e.preventDefault()
        if (formData.fullName && formData.email && formData.password && formData.phoneNumber && formData.address) {
            axios.post(REGISTER_ADMIN, {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
            }).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Admin succesfully registered!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                handleCloseForm();
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

    if (isLoading) return <LoadSpinner/>

  return (
    <div>
        <p style={{marginTop:20, textAlign: 'center', fontSize:25, fontWeight: 'bold'}}>Welcome, <span style={{color: 'green'}}>{user.email.split("@")[0]}</span></p>
        <p style={{marginBottom: 50, textAlign: 'center', fontSize:17}}>What would you like to do today?</p>
        {
            role === "ROLE_SUPER_ADMIN" && 
            <div className='justify-content-center align-items-center d-flex m-3'>
                <Button variant='success' style={{margin:5}} onClick={handleShowForm}>Register New Admin</Button>
            </div>
        }

        <Modal
            show={showForm}
            onHide={handleCloseForm}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Register Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className='mb-2'>
                        <label>Fullname</label>
                        <input type='text' className='form-control' placeholder="Enter fullname"
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}/>
                    </div>
                    <div className='mb-2'>
                        <label>Email</label>
                        <input type='email' className='form-control' placeholder="Enter email"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
                    </div>
                    <div className='mb-2'>
                        <label>Password</label>
                        <input type="password" id="setPassword" name="password" className="form-control" placeholder="Enter password" 
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>                                                
                    </div>
                    <div className='mb-2'>
                        <label>Phone Number</label>
                        <PhoneInput
                            className="phone-input"
                            country={"id"}
                            placeholder='Enter your phone number'
                            onlyCountries={['id', 'us', 'cn', 'jp', 'sg', 'au', 'sa', 'kr', 'gb']}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Address</label>
                        <input type="text" name="address" className="form-control" placeholder="Enter address" 
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseForm}>
                Cancel
            </Button>
            <Button variant="success" onClick={handleRegister}>Register</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default AdminDashboard