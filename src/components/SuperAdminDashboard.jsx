import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './redux/UserSlice'
import { GET_ALL_CUSTOMER, REGISTER_ADMIN } from '../constant/Endpoint';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';

const SuperAdminDashboard = () => {

    const user = useSelector(selectUser);
    const [customerList, setCustomerList] = useState([])
    const [searchResult, setSearchResult] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    const [showCustomer, setShowCustomer] = useState(false)
    const [showForm, setShowForm] = useState(false);

    const handleShowCustomer = () => setShowCustomer(!showCustomer)
    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = () => setShowForm(true);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
    })

    const getCustomerList = async() => {
        await axios
            .get(GET_ALL_CUSTOMER)
            .then(res => setCustomerList(res.data.data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getCustomerList()
    }, [])

    const displayEmptyCustomer = (
        <div className="text-center">
            <h2>No customer found</h2>
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
                <td><button><i class="bi bi-trash3"></i></button></td>
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
                <td><button><i class="bi bi-trash3"></i></button></td>
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
                window.alert("Register Succesful!")
                handleCloseForm();
            }).catch(err => {
                console.log(err)
                window.alert("Register Failed")
            }) 
        } else window.alert("Field(s) cannot be empty")
    }

  return (
    <div>
        <p style={{marginTop:20, textAlign: 'center', fontSize:25, fontWeight: 'bold'}}>Welcome, <span style={{color: 'green'}}>{user.email.split("@")[0]}</span></p>
        <p style={{marginBottom: 20, textAlign: 'center', fontSize:17}}>What would you like to do today?</p>
        <div className='justify-content-center align-items-center d-flex m-3'>
            <Button variant='success' style={{margin:5}} onClick={handleShowForm}>Register Admin</Button>
            <Button variant='success' style={{margin:5}} onClick={handleShowCustomer}>Show Customer</Button>
        </div>
        {showCustomer? 
        <>
            <p style={{marginBottom: -5, textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>{customerList.length}</p>
            <p style={{marginBottom:25, textAlign: 'center'}}>{"Registered Users"}</p>
            <div className='container justify-content-center align-items-center d-flex mb-4'>    
                <input style={{textAlign:'center'}} type='text' placeholder='Search by name' onChange={handleSearch}/>  
            </div>
            <div style={{textAlign: 'center'}}>{isSearching ? displayTable : customerList.length == 0 ? displayEmptyCustomer : displayTable}</div>
        </> 
        : 
        <></>}
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

export default SuperAdminDashboard