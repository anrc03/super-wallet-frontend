import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectUser } from "../../components/redux/UserSlice";

function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    email: "",
    password: "",
    address: "",
    image: "",
  });

  const user = useDispatch(selectUser);

  console.log("ini id : " + user.customerId);

  const [valid, setValid] = useState("");

  const [errors, setErrors] = useState("");

  useEffect(() => {
    axios.get(`GET_ALL_CUSTOMER/${customerId}`).then((response) => {
      const userData = response.data.data;
      setFormData(userData);
    });
  });

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

    if (!formData.gender) {
      isValid = false;
      validationErrors.gender = "Gender must be selected";
    }

    if (!formData.address) {
      isValid = false;
      validationErrors.address = "Address must be filled";
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
  return (
    <div className="container-xl px-4 mt-4">
      {/* Account page navigation*/}
      <h1 className="display-6 fw-bold text-green">Edit profile</h1>
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          {/* Profile picture card*/}
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              {/* Profile picture image*/}
              <img
                className="img-account-profile rounded-circle mb-2"
                style={{ alignContent: "center", width: "300px" }}
                src="src/assets/images/Profile.png"
                alt=""
              />
              {/* Profile picture help block*/}
              <div className="small font-italic text-muted mb-2">
                JPG or PNG no larger than 5 MB
              </div>
              {/* Profile picture upload button*/}
              <button className="btn btn-primary" type="button">
                Upload new image
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          {/* Account details card*/}
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form>
                {/* Form Group (first name)*/}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    First Name
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your first name"
                  />
                </div>
                {/* Form Group (last name)*/}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Last Name
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your last name"
                  />
                </div>
                {/* Form Group (password)*/}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputPassword">
                    Password
                  </label>
                  {valid ? (
                    <></>
                  ) : (
                    <span className="text-danger"> {errors.password}</span>
                  )}
                  <div className="input-group">
                    <input
                      type="password"
                      id="setPassword"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text ms-2 eye-icon"
                        onClick={handleShowPassword}
                        id="passwordToggleIcon"
                      >
                        <i className="bi bi-eye-slash-fill"></i>
                      </span>
                    </div>
                  </div>
                </div>
                {/* Form Group (Phone)*/}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Phone Number
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your phone number"
                  />
                </div>
                {/* Form Group (Phone)*/}
                {/* <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Birth Date
                  </label>
                  {valid ? (
                    <></>
                  ) : (
                    <span className="text-danger"> {errors.birthDate}</span>
                  )}
                  <div className="icon">
                    <DatePicker
                      className="date-input"
                      showIcon
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 48 48"
                        >
                          <mask id="ipSApplication0">
                            <g
                              fill="none"
                              stroke="#fff"
                              strokeLinejoin="round"
                              strokeWidth="4"
                            >
                              <path
                                strokeLinecap="round"
                                d="M40.04 22v20h-32V22"
                              ></path>
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
                      onChange={(date) =>
                        setFormData({ ...formData, birthDate: date })
                      }
                      dateFormat={"yyyy-MM-dd"}
                      placeholderText="Enter your birth date"
                    />
                  </div>
                </div> */}
                {/* Form Group (email address)*/}
                {/* <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Gender
                  </label>
                  {valid ? (
                    <></>
                  ) : (
                    <span className="text-danger"> {errors.gender}</span>
                  )}
                  <div>
                    <fieldset>
                      <input
                        type="radio"
                        id="male"
                        value="MALE"
                        name="gender"
                        checked={formData.gender === "MALE"}
                        style={{ marginRight: 5 }}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                      ></input>
                      <label htmlFor="male" style={{ marginRight: 5 }}>
                        Male
                      </label>

                      <input
                        type="radio"
                        id="female"
                        value="FEMALE"
                        name="gender"
                        checked={formData.gender === "FEMALE"}
                        style={{ marginLeft: 5 }}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                      ></input>
                      <label htmlFor="female" style={{ marginLeft: 5 }}>
                        Female
                      </label>
                    </fieldset>
                  </div>
                </div> */}
                {/* Form Group (username)*/}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Address
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your address ex : Bekasi City"
                  />
                </div>

                {/* Form Group (email)*/}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Email
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your email address ex : name@gmail.com"
                  />
                </div>

                {/* Save changes button*/}
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
