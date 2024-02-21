import React, { useEffect, useState } from 'react'
import { BASE_CUSTOMER, CHANGE_PASSWORD, getAllCustomerByPage, getFilteredCustomerByName, updateCustomer } from '../constant/Endpoint';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';

const CustomerList = () => {

    const [customerList, setCustomerList] = useState([])
    const [searchResult, setSearchResult] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [searchParam, setSearchParam] = useState(null)
    const [searchMethod, setSearchMethod] = useState("")
    const [isSearchingByParam, setIsSearchingByParam] = useState(false)
    const [showForm, setShowForm] = useState(false);

    const [transactionCount, setTransactionCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const [size, setSize] = useState(5)

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

    const getCustomerList = async(page, size) => {
        await axios
            .get(getAllCustomerByPage(page, size))
            .then(res => {
                setCustomerList(res.data.data)
                setTransactionCount(res.data.pagingResponse.totalItem)
                setTotalPage(res.data.pagingResponse.totalPage)
            })
            .catch(err => console.error(err.message))
    }

    const getFiteredCustomerByFullName = async(name, page, size) => {
        await axios
            .get(getFilteredCustomerByName(name, page, size))
            .then(res => {
                console.log("search", res.data.data)
                setCustomerList(res.data.data)
                setTransactionCount(res.data.pagingResponse.totalItem)
                setTotalPage(res.data.pagingResponse.totalPage)
            })
            .catch(err => console.error(err.message))
    }

    useEffect(() => {
        getCustomerList(currentPage, size)
    }, [currentPage])

    console.log(customerList)

    const handleDelete = (id, firstName, lastName) => {
        Swal.fire({
            title: "Are you sure?",
            text: `About to Delete: ${firstName + " " + lastName}`,
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
                            title: "Delete Failed",
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

    const handleSearchByParam = (e) => {
        setIsSearchingByParam(true)
        setCurrentPage(0)
        const input = searchParam.trim()
        getFiteredCustomerByFullName(input, currentPage, size)

    }

    const handlePrevious = async () => {
        if (currentPage != 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = async () => {
        setCurrentPage(currentPage + 1)
    }

    const displayPagination = (
        <div className="justify-content-center align-items-center d-flex mt-4">
            <button onClick={handlePrevious} disabled={currentPage === 0}><i className="bi bi-caret-left-fill"></i></button>
            <div className='m-2' style={{fontSize:15}}>{currentPage + 1}</div>
            <button onClick={handleNext} disabled={currentPage === totalPage - 1}><i className="bi bi-caret-right-fill"></i></button>
        </div>
    )

    const handleReset = () => {
        setIsSearchingByParam(false)
        setCurrentPage(0)
        getCustomerList(currentPage, size)
    }

    const handleSearchFullName = (e) => {
        setSearchParam(e.target.value)
    } 

  return (
        <>
            <p style={{marginBottom: -5, textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>{transactionCount}</p>
            <p style={{marginBottom:25, textAlign: 'center'}}>{isSearchingByParam ? "Result Found" : "Registered Users"}</p>
            {/* <div className='container justify-content-center align-items-center d-flex mb-4 search-input input-group'> */}
                {/* <input type='text' placeholder='Search by name in this page' onChange={handleSearch} /> */}
                {/* <div className="input-group-append">
                    <span className="input-group-text search-icon">
                        <i class="bi bi-search"></i>
                    </span>
                </div> */}
            {/* </div> */}
            <div className='container justify-content-center align-items-center d-flex mb-4 search-input input-group'>
            <div className="justify-content-center align-items-center d-flex">
        <select
          name="Search Method"
          className='form-select'
          onChange={(e) => setSearchMethod(e.target.value)}
        >
          <option disabled selected>Search By</option>
          <option value="Full Name">Full Name</option>
          <option value="This Page">This Page Only</option>
        </select>
        </div>
                <input type='text' placeholder='Search here' onChange={searchMethod === "Full Name" ? handleSearchFullName : handleSearch} />
                <div className="input-group-append" onClick={handleSearchByParam}>
                    <span className="input-group-text search-icon">
                        <i class="bi bi-search"></i>
                    </span>
                </div>
                <div className="justify-content-center align-items-center mx-1"><button className="btn btn-dark" onClick={handleReset}>Reset</button></div>
            </div>
            <div style={{textAlign: 'center'}}>{isSearching ? displayTable : customerList.length == 0 ? displayEmptyList : displayTable}</div>
            <div style={{textAlign: 'center'}}>{totalPage > 1 && displayPagination}</div>

            <Modal
            show={showForm}
            onHide={handleCloseForm}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Update Customer</Modal.Title>
            </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='mb-2'>
                                <label>Id</label>
                                <input type='text' className='form-control' style={{backgroundColor:'#D3D3D3', fontWeight:'bold'}} value={formData.id} readOnly/>
                            </div>
                            <div className='mb-2'>
                                <label>First Name</label>
                                <input type='text' className='form-control' value={formData.firstName} placeholder="Enter first name"
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}/>
                            </div>
                            <div className='mb-2'>
                                <label>Last Name</label>
                                <input type='text' className='form-control' value={formData.lastName} placeholder="Enter last name"
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}/>
                            </div>
                            <div className='mb-2'>
                                <label>Birthdate</label>
                                <input type='text' className='form-control' value={formData.birthDate} placeholder="Enter birthdate"
                                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}/>
                            </div>
                            <div className='mb-2'>
                                <label>Email</label>
                                <input type='email' className='form-control' style={{backgroundColor:'#D3D3D3', fontWeight:'bold'}} value={formData.email} 
                                        placeholder="Enter email" readOnly onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
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
                            <div className='mb-2'>
                                <fieldset>
                                    <input type='radio' id='male' value="MALE" name='gender' checked={formData.gender === "MALE"} 
                                        style={{marginRight:5}}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}></input>
                                    <label htmlFor='male' style={{marginRight:5}}>Male</label>

                                    <input type='radio' id='female' value="FEMALE" name='gender' checked={formData.gender === "FEMALE"} 
                                        style={{marginLeft:5}}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        ></input>
                                    <label htmlFor='female' style={{marginLeft:5}}>Female</label>
                                </fieldset>  
                            </div>
                        </div>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseForm}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </> 
  )
}

export default CustomerList