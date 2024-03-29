import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../constant/Endpoint';
import { login } from '../../components/redux/UserSlice';
import { Helmet } from 'react-helmet';
import LoadSpinner from '../../components/LoadSpinner';
import { jwtDecode } from 'jwt-decode';

    function Login() {
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
            axios.post(LOGIN, { email: formData.email, password: formData.password })
                .then((result) => {
                    const user = result.data.data;
                    let customerId;
                    user.role === "ROLE_CUSTOMER" ? customerId = jwtDecode(user.token).customerId : customerId = null
                    dispatch(login({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: formData.email,
                        token: user.token,
                        role: user.role,
                        loggedIn: true,
                        customerId: customerId
                    }));
                })
                .catch((err) => {
                    console.log(err)
                    isValid = false;
                    validationErrors.email = 'Either email not register or password incorrect';
                    validationErrors.password = 'Either email not register or password incorrect';
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

        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }, [])

        if (isLoading) return <LoadSpinner />

        return (
            <div className="login-background">
                <Helmet>
                <title>Login | Super Wallet</title>
            </Helmet>
                <div className="container login-container">
                    <div className="col-md-11">
                        <form className="border login-form">
                            <div className="row container-fluid justify-content-center">
                                <div className="col-md-5 d-flex">
                                    <Link to="/">
                                    <img src="src/assets/images/login/Login.png" alt="Login Picture" className="img-fluid" />
                                    </Link>
                                </div>
                                <div className="col-md-6 p-4">
                                    <h4 className="mb-2" style={{ color: '#3a5a40', fontSize: 30, fontWeight: '600' }}>Log in account</h4>
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
                                            <div className="mt-2 mb-1">
                                            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck"/>
                                                <label className="form-check-label" htmlFor="exampleCheck">Remember me</label>
                                            </div>
                                        </div>
                                        <span className="text-create">Don't have an account? <Link to="/register" className="login-link">Create account</Link></span>
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

    export default Login;
