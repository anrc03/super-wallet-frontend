import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './redux/UserSlice';
import LoadSpinner from './LoadSpinner';
import { LOGIN_ADMIN } from '../constant/Endpoint';

function AdminLogin() {
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
        setIsLoading(false);
        }, 1000)
    }, [])

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(true);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        let validationErrors = {};

        if (!formData.email || formData.email === '') {
            isValid = false;
            validationErrors.email = 'Email address is required';
        } else if (!validateEmail(formData.email)) {
            isValid = false;
            validationErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password || formData.password === '') {
            isValid = false;
            validationErrors.password = 'Password is required';
        }

        if (isValid) {
            axios.post(LOGIN_ADMIN, { email: formData.email, password: formData.password })
                .then((result) => {
                    const user = result.data.data;
                    axios.defaults.headers.common = {'Authorization': `Bearer ${user.token}`}
                    dispatch(login({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        token: user.token,
                        role: user.role,
                        loggedIn: true,
                    }));
                })
                .catch((err) => {
                    console.log(err)
                    isValid = false;
                    validationErrors.email = 'Email address not registered';
                    validationErrors.password = 'Incorrect password';
                    setErrors(validationErrors);
                    setValid(isValid);
                });
        } else {
            setErrors(validationErrors);
            setValid(isValid);
        }
    };

    const handleShowPassword = () => {
        const input = document.getElementById('setPassword');
        const icon = document.getElementById('passwordToggleIcon');

        if (input.type === 'password') {
            input.type = 'text';
            icon.innerHTML = '<i class="bi bi-eye-fill"></i>';
        } else {
            input.type = 'password';
            icon.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
        }
    };

    if (isLoading) return <LoadSpinner />

    return (
        <div className="login-background">
            <div className="container login-container">
                <div className="col-md-10">
                    <form className="border login-form">
                        <div className="row container-fluid justify-content-center">
                            <div className="col-md-5 d-flex">
                                <img src="./../src/assets/images/login/Login.png" alt="Login Picture" className="img-fluid" />
                            </div>
                            <div className="col-md-6 p-4">
                                <h4 className="mb-2" style={{ color: '#3a5a40', fontSize: 30, fontWeight: '600' }}>Admin Login</h4>
                                <div className="row" style={{ color: '#3a5a40' }}>
                                    <div className="mb-2 col-md-12">
                                        <label className="mb-2">Email address<span className="text-danger"> *</span></label>
                                        {valid ? <></> : <span className="text-danger"> {errors.email}</span>}
                                        <input type="email" name="email" className="form-control" placeholder="Enter your email address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                    <div className="mb-1 col-md-12">
                                        <label className="mb-2">Password<span className="text-danger"> *</span></label>
                                        {valid ? <></> : <span className="text-danger"> {errors.password}</span>}
                                        <div className="input-group">
                                            <input type="password" id="setPassword" name="password" className="form-control" placeholder="Enter your password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                            <div className="input-group-append">
                                                <span className="input-group-text ms-2 eye-icon" onClick={handleShowPassword} id="passwordToggleIcon">
                                                    <i className="bi bi-eye-slash-fill"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="form-check mt-2">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck"/>
                                            <label className="form-check-label" htmlFor="exampleCheck">Remember me</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <button type="submit" className="btn float-end login-button mt-2" onClick={handleSubmit}>Log in</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
