import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_CUSTOMER } from '../../constant/Endpoint';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import LoadSpinner from '../../components/LoadSpinner';
import { Helmet } from 'react-helmet';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Swal from 'sweetalert2';

function Register() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [])

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

    if (!formData.email || formData.email === "") {
      isValid = false;
      validationErrors.email = "Email address must be filled";
    } else if (!validateEmail(formData.email)) {
      isValid = false;
      validationErrors.email = "Invalid email address";
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
    }

    if (!formData.birthDate || formData.birthDate === "") {
      isValid = false;
      validationErrors.birthDate = "Birth date must be filled";
    } else {
      const birthDate = new Date(formData.birthDate);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = currentDate.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        isValid = false;
        validationErrors.birthDate =
          "You must be at least 18 years old to register";
      }
    }

        if (!formData.birthDate || formData.birthDate === '') {
            isValid = false;
            validationErrors.birthDate = "Birth date must be filled";
        } else {
            const birthDate = new Date(formData.birthDate);
            const currentDate = new Date();
            let age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = currentDate.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 18) {
                isValid = false;
                validationErrors.birthDate = "You must be at least 18 years old to register";
            }
        }

        if (!formData.gender) {
            isValid = false;
            validationErrors.gender = "Gender must be selected";
        }

        if (!formData.address) {
            isValid = false;
            validationErrors.address = "Address must be filled";
        }

        if (isValid) {
            axios.post(REGISTER_CUSTOMER, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                birthDate: moment(formData.birthDate).format("yyyy-MM-DD"),
                gender: formData.gender,
                address: formData.address,
                email: formData.email,
                password: formData.password,
            })
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "You're registered!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/login');
                })
                .catch((err) => {
                    isValid = false;
                    validationErrors.username = 'Username already exist';
                    setErrors(validationErrors);
                    setValid(isValid);
                    Swal.fire({
                        icon: "error",
                        title: err.message,
                        showConfirmButton: false,
                        timer: 1000
                    });
                });
        } else {
            setErrors(validationErrors);
            setValid(isValid);
        }

    if (isValid) {
      axios
        .post(REGISTER_CUSTOMER, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          birthDate: moment(formData.birthDate).format("yyyy-MM-DD"),
          gender: formData.gender,
          address: formData.address,
          email: formData.email,
          password: formData.password,
        })
        .then(() => {
          navigate("/login");
        })
        .catch((err) => {
          isValid = false;
          validationErrors.username = "Username already exist";
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
      icon.innerHTML = '<i class="bi bi-eye-fill"></i>';
    } else {
      input.type = "password";
      icon.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
    }
  };

  const handleShowConfirmPassword = () => {
    let input = document.getElementById("setConfirmPassword");
    let icon = document.getElementById("confirmPasswordToggleIcon");

    if (input.type === "password") {
      input.type = "text";
      icon.innerHTML = '<i class="bi bi-eye-fill"></i>';
    } else {
      input.type = "password";
      icon.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
    }
  };

    if (isLoading) return <LoadSpinner />

    return (
        <div className="register-background">
            <Helmet>
                <title>Register | Super Wallet</title>
            </Helmet>
            <div className="container register-container">
                <div className="col-md-6">
                    <form action="" className="border register-form">
                        <div className="row container-fluid justify-content-center">
                            <div className='col-md-10 p-2'>
                                <h4 className="mb-2" style={{ color: '#3a5a40', fontSize: 30, fontWeight: '600' }}>Create account</h4>
                                <div className="row" style={{ color: '#3a5a40' }}>
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
                                        <label className="mb-2">Phone number<span className="text-danger"> *</span></label>
                                        {
                                            valid ? <></> : <span className="text-danger"> {errors.phoneNumber}</span>
                                        }
                                        <PhoneInput
                                            className="phone-input"
                                            country={"id"}
                                            placeholder='Enter your phone number'
                                            onlyCountries={['id', 'us', 'cn', 'jp', 'sg', 'au', 'sa', 'kr', 'gb']}
                                            onChange={(e) => setFormData({ ...formData, phoneNumber: e })}/>
                                    </div>

                                    <div className="mb-2 col-md-12">
                                        <label className="mb-2">Birth date<span className="text-danger"> *</span></label>
                                        {
                                            valid ? <></> : <span className="text-danger"> {errors.birthDate}</span>
                                        }
                                        <div className='icon'>
                                            <DatePicker
                                                className='date-input'
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
                                    <div className="mb-2 col-md-12">
                                        <label className="mb-2">Gender<span className="text-danger"> *</span></label>
                                        {
                                            valid ? <></> : <span className="text-danger"> {errors.gender}</span>
                                        }
                                        <div>
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
                                    <div className="mb-2 col-md-12">
                                        <label className="mb-2">Address<span className="text-danger"> *</span></label>
                                        {
                                            valid ? <></> : <span className="text-danger"> {errors.address}</span>
                                        }
                                        <input type="text" name="address" className="form-control" placeholder="Enter your address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
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
  );
}

export default Register;
