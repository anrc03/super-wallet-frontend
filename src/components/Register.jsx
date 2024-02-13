import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        phoneNumber: '',
    });

    const validatePassword = (password) => {
        if (password.length < 8) {
            return "Password must at least 8 characters";
        }

        if (!/(?=.*[a-z])/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }

        if (!/(?=.*[A-Z])/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }

        if (!/(?=.*\d)/.test(password)) {
            return "Password must contain at least one digit";
        }

        return null;
    };


    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(true);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        let validationErrors = {};

        if (formData.username === "" || formData.username === null) {
            isValid = false;
            validationErrors.username = "Username must be filled";
        }

        if (!formData.email || formData.email === '') {
            isValid = false;
            validationErrors.email = 'Email address must be filled';
        } else if (!validateEmail(formData.email)) {
            isValid = false;
            validationErrors.email = 'Invalid email address';
        }

        if (formData.password === "" || formData.password === null) {
            isValid = false;
            validationErrors.password = "Password must be filled";
        } else {
            const passwordError = validatePassword(formData.password);
            if (passwordError) {
                isValid = false;
                validationErrors.password = passwordError;
            }
        }

        if (formData.confirmPassword === "" || formData.confirmPassword === null) {
            isValid = false;
            validationErrors.confirmPassword = "Confirm password must be filled";
        } else if (formData.password !== formData.confirmPassword) {
            isValid = false;
            validationErrors.confirmPassword = "Password doesn't match";
        }

        if (formData.firstName === "" || formData.firstName === null) {
            isValid = false;
            validationErrors.firstName = "First Name must be filled";
        }

        if (formData.lastName === "" || formData.lastName === null) {
            isValid = false;
            validationErrors.lastName = "Last Name must be filled";
        }

        if (formData.phoneNumber === "" || formData.phoneNumber === null) {
            isValid = false;
            validationErrors.phoneNumber = "Number phone must be filled";
        } else if (isNaN(formData.phoneNumber)) {
            isValid = false;
            validationErrors.phoneNumber = "Number phone must be numeric";
        }

        if (isValid) {
            axios.post('http://localhost:8080/api/auth/register/customer', { username: formData.username, password: formData.password, firstName: formData.firstName, lastName: formData.lastName, address: formData.address, phoneNumber: formData.phoneNumber, email: formData.email })
                .then(() => {
                    navigate('/login');
                })
                .catch((err) => {
                    isValid = false;
                    validationErrors.username = 'Username already exist';
                    setErrors(validationErrors);
                    setValid(isValid);
                });
        } else {
            setErrors(validationErrors);
            setValid(isValid);
        }

    };

    const handleShowPassword = () => {
        let input = document.getElementById("setPassword");
        let icon = document.getElementById("passwordToggleIcon");

        if (input.type === "password") {
            input.type = "text";
            icon.innerHTML = '<i className="bi bi-eye-fill"></i>';
        } else {
            input.type = "password";
            icon.innerHTML = '<i className="bi bi-eye-slash-fill"></i>';
        }
    };

    const handleShowConfirmPassword = () => {
        let input = document.getElementById("setConfirmPassword");
        let icon = document.getElementById("confirmPasswordToggleIcon");

        if (input.type === "password") {
            input.type = "text";
            icon.innerHTML = '<i className="bi bi-eye-fill"></i>';
        } else {
            input.type = "password";
            icon.innerHTML = '<i className="bi bi-eye-slash-fill"></i>';
        }
    };

    return (
        <div className="register-background">
            <div className="container register-container">
                <div className="col-md-6">
                    <form action="" className="border register-form">
                        <div className="row container-fluid justify-content-center">
                            <div className='col-md-10 p-4'>
                                <h4 className="mb-2" style={{ color: '#3a5a40', fontSize: 30, fontWeight: '600' }}>Create account</h4>
                                <div className="row" style={{ color: '#3a5a40' }}>
                                    <div className="mb-2 col-md-12">
                                        <label className="mb-2">Username<span className="text-danger"> *</span></label>
                                        {
                                            valid ? <></> : <span className="text-danger"> {errors.username}</span>
                                        }
                                        <input type="text" name="username" className="form-control" placeholder="Enter your username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                                    </div>
                                    <div className="mb-2 col-md-12">
                                        <label className="mb-2">Email address<span className="text-danger"> *</span></label>
                                        {
                                            valid ? <></> : <span className="text-danger"> {errors.email}</span>
                                        }
                                        <input type="email" name="email" className="form-control" placeholder="Enter your email address" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                    <div className="mb-2 col-md-12">
                                        <label className="mb-2">Password<span className="text-danger"> *</span></label>
                                        {
                                            valid ? <></> : <span className="text-danger"> {errors.password}</span>
                                        }
                                        <div className="input-group">
                                            <input type="password" id="setPassword" name="password" className="form-control" placeholder="Enter your password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                            <div className="input-group-append">
                                                <span className="input-group-text ms-2 eye-icon" onClick={handleShowPassword} id='passwordToggleIcon'>
                                                    <i className="bi bi-eye-slash-fill"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2 col-md-12">
                                        <label className="mb-2">Confirm password<span className="text-danger"> *</span></label>
                                        {
                                            valid ? <></> : <span className="text-danger"> {errors.confirmPassword}</span>
                                        }
                                        <div className="input-group">
                                            <input type="password" id="setConfirmPassword" name="password" className="form-control" placeholder="Confirm your password" onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                                            <div className="input-group-append">
                                                <span className="input-group-text ms-2 eye-icon" onClick={handleShowConfirmPassword} id='confirmPasswordToggleIcon'>
                                                    <i className="bi bi-eye-slash-fill"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2 col-md-12">
                                        <label className="mb-2">First name<span className="text-danger"> *</span></label>
                                        {
                                            valid ? <></> : <span className="text-danger"> {errors.firstName}</span>
                                        }
                                        <input type="text" name="firstName" className="form-control" placeholder="Enter your first name" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                                    </div>
                                    <div className="mb-2 col-md-12">
                                        <label className="mb-2">Last name<span className="text-danger"> *</span></label>
                                        {
                                            valid ? <></> : <span className="text-danger"> {errors.lastName}</span>
                                        }
                                        <input type="text" name="lastName" className="form-control" placeholder="Enter your last name" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                                    </div>
                                    <div className="mb-2 col-md-12">
                                        <label className="mb-2">Number phone<span className="text-danger"> *</span></label>
                                        {
                                            valid ? <></> : <span className="text-danger"> {errors.phoneNumber}</span>
                                        }
                                        <input type="text" name="phoneNumber" className="form-control" placeholder="Enter your number phone" onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                                    </div>
                                    <span className="mb-2">Already have an account? <Link to="/login" className="register-link">Log in</Link></span>
                                    <div className="col-md-12">
                                        <button className="btn float-end register-button" onClick={handleSubmit}>Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register