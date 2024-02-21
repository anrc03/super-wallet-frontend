import React, { useEffect, useState } from 'react'
import { BASE_CUSTOMER, CHANGE_PASSWORD, updateCustomer } from '../constant/Endpoint';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import DatePicker from 'react-datepicker';

const CustomerList = () => {

    const [customerList, setCustomerList] = useState([])
    const [searchResult, setSearchResult] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = () => setShowForm(true);

    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        bankData: null,
        images: null,
    })

    const getCustomerList = async () => {
        await axios
            .get(BASE_CUSTOMER)
            .then(res => setCustomerList(res.data.data))
            .catch(err => console.error(err.message))
    }

    useEffect(() => {
        getCustomerList()
    }, [])

    console.log(customerList)

    const handleDelete = (id, firstName, lastName) => {
        Swal.fire({
            title: "Are you sure?",
            text: `About to delete : ${firstName + " " + lastName}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(BASE_CUSTOMER + "/" + id)
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
                            title: "Delete failed",
                            text: err,
                            icon: "error"
                        })
                    })
            }
        });
    }

    const handleClickEdit = (id, firstName, lastName, birthDate, gender, phoneNumber, email, address) => {
        handleShowForm()
        setFormData({
            ...formData,
            id: id,
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            gender: gender,
            phoneNumber: phoneNumber,
            email: email,
            address: address,
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        if (formData.id && formData.firstName && formData.lastName && formData.birthDate && formData.gender 
                && formData.email && formData.phoneNumber && formData.address) {
            axios.put(updateCustomer(formData.id, formData.firstName, formData.lastName, formData.phoneNumber, formData.birthDate, formData.gender, formData.address))
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Customer succesfully updated!",
                    showConfirmButton: false,
                    timer: 1500
                });
                handleCloseForm();
                getCustomerList();
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
                <img src="./../src/assets/images/Empty.png" alt="Empty Picture" />
            </div>
            <p className='empty-info'>The customer list is empty</p>
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
                    <button type="button" className="btn btn-green m-1" onClick={() => {
                        setFormData({...formData, bankData: customer.bankData, images: customer.images})
                        handleClickEdit(customer.id, customer.firstName, customer.lastName, customer.birthDate, 
                            customer.gender, customer.phoneNumber, customer.userCredential.email, customer.address)
                    }}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" className="btn btn-red m-1" onClick={() => handleDelete(customer.id, customer.firstName, customer.lastName)}>
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
                    <button type="button" className="btn btn-green m-1" onClick={() => {
                        setFormData({...formData, bankData: customer.bankData, images: customer.images})
                        handleClickEdit(customer.id, customer.firstName, customer.lastName, customer.birthDate, 
                            customer.gender, customer.phoneNumber, customer.userCredential.email, customer.address)
                    }}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" className="btn btn-red m-1" onClick={() => handleDelete(customer.id, customer.firstName, customer.lastName)}>
                            <i className="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>
    ));

    const displayTable = (
        <div className="container">
            <div className="row">
                {isSearching && searchResult.length === 0 ? (
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
                )}

            </div>
        </div>
    )

    const handleSearch = (e) => {
        setIsSearching(true);
        const input = e.target.value.toLowerCase().trim();
        setSearchInput(input)
        const filteredCustomer = customerList.filter(customer => {
            const fullName = (customer.firstName + " " + customer.lastName).toLowerCase();
            return fullName.includes(input);
        });
        setSearchResult(filteredCustomer);
        if (input === "") setIsSearching(false);
    };


    return (
        <>
            <p style={{ marginBottom: -5, textAlign: 'center', fontWeight: 'bold', fontSize: 40, marginTop: 4 }}>{customerList.length}</p>
            <p style={{ marginBottom: 15, textAlign: 'center', fontSize: 20, color: '#6f9459' }}>Registered Users</p>
            <div className='container justify-content-center align-items-center d-flex mb-4 search-input input-group'>
                <input type='text' placeholder='Search by name' onChange={handleSearch} />
                <div className="input-group-append">
                    <span className="input-group-text search-icon">
                        <i class="bi bi-search"></i>
                    </span>
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>{isSearching ? displayTable : customerList.length == 0 ? displayEmptyList : displayTable}</div>
            <Modal
                show={showForm}
                onHide={handleCloseForm}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header className='admin-close' closeButton>
                    <Modal.Title>Update Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-update'>
                        <div className='mb-2'>
                            <label className='mb-2'>Id</label>
                            <input type='text' className='form-control' style={{ backgroundColor: '#95b79c', color: '#fff', fontWeight: 'bold' }} value={formData.id} readOnly />
                        </div>
                        <div className='mb-2'>
                            <label className='mb-2'>First Name</label>
                            <input type='text' className='form-control' value={formData.firstName} placeholder="Enter first name"
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                        </div>
                        <div className='mb-2'>
                            <label className='mb-2'>Last Name</label>
                            <input type='text' className='form-control' value={formData.lastName} placeholder="Enter last name"
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                        </div>
                        <div className='mb-2'>
                            <label className='mb-2'>Birthdate</label>
                            <div className='icon'>
                                <DatePicker
                                    className='date-customer'
                                    showIcon
                                    icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 48 48"
                                        >
                                            <mask id="ipSApplication0">
                                                <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                                    <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                                                    <path
                                                        fill="#fff"
                                                        d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                                    ></path>
                                                </g>
                                            </mask>
                                            <path
                                                fill="currentColor"
                                                d="M0 0h48v48H0z"
                                                mask="url(#ipSApplication0)"
                                            ></path>
                                        </svg>
                                    }
                                    selected={formData.birthDate}
                                    onChange={(date) => setFormData({ ...formData, birthDate: date })}
                                    dateFormat={"yyyy-MM-dd"}
                                    placeholderText='Enter your birth date'
                                />
                            </div>
                        </div>
                        <div className='mb-2'>
                            <label className='mb-2'>Email</label>
                            <input type='email' className='form-control' value={formData.email} placeholder="Enter email" style={{backgroundColor:'#D3D3D3', fontWeight:'bold'}}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} readOnly/>
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
                            <input type="text" name="address" className="form-control" value={formData.address} placeholder="Enter address"
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                        </div>
                        <div className='mb-2'>
                            <label className='mb-2'>Gender</label>
                            <fieldset>
                                <input type='radio' id='male' value="MALE" name='gender' checked={formData.gender === "MALE"}
                                    style={{ marginRight: 5 }}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}></input>
                                <label htmlFor='male' style={{ marginRight: 5 }}>Male</label>

                                <input type='radio' id='female' value="FEMALE" name='gender' checked={formData.gender === "FEMALE"}
                                    style={{ marginLeft: 5 }}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                ></input>
                                <label htmlFor='female' style={{ marginLeft: 5 }}>Female</label>
                            </fieldset>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-red' onClick={handleCloseForm}>
                        Cancel
                    </Button>
                    <Button className='btn-green' onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CustomerList