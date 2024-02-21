import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../components/redux/UserSlice";
import { BASE_CUSTOMER } from "../../constant/Endpoint";
import { Helmet } from "react-helmet";
import PhoneInput from "react-phone-input-2";
import ReactDatePicker from "react-datepicker";

function EditProfile() {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    userCredential: {
      email: "",
    },
    password: "",
    address: "",
    image: "",
  });

  const user = useSelector(selectUser);
  const customerId = user.customerId;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_CUSTOMER}/${customerId}`)
      .then((response) => {
        const userData = response.data.data;
        setFormData(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [customerId]);

  const handleFirstNameChange = (e) => {
    setFormData({ ...formData, firstName: e.target.value });
  };

  const handleLastNameChange = (e) => {
    setFormData({ ...formData, lastName: e.target.value });
  };

  const handleBirthDateChange = (e) => {
    setFormData({ ...formData, birthDate: e.target.value });
  };

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleAddressChange = (e) => {
    setFormData({ ...formData, address: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleEmailChange = (e) => {
    setFormData({
      ...formData,
      userCredential: {
        ...formData.userCredential,
        email: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("id", customerId);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("birthDate", formData.birthDate);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("email", formData.userCredential.email);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.put(`${BASE_CUSTOMER}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Set Content-Type ke form-data
        },
      });

      if (response.status === 200) {
        console.log("sukses ubah");
        navigate("/profile");
      } else {
        console.error("Update failed:", response.data);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  return (
    <div className="register-background">
      <Helmet>
        <title>Register | Super Wallet</title>
      </Helmet>
      <div className="container register-container">
        <div className="col-md-6">
          <form action="" className="border register-form">
            <div className="row container-fluid justify-content-center">
              <div className="col-md-10 p-2">
                <h4
                  className="mb-2"
                  style={{ color: "#3a5a40", fontSize: 30, fontWeight: "600" }}
                >
                  Create account
                </h4>
                <div className="row" style={{ color: "#3a5a40" }}>
                  <div className="mb-2 col-md-12">
                    <label className="mb-2">Email address</label>
                    <input
                      className="form-control"
                      style={{
                        backgroundColor: "#95b79c",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                      value={formData.userCredential?.email || ""}
                      id="inputEmail"
                      type="text"
                      placeholder="Enter your email address"
                      onChange={handleEmailChange}
                      readOnly
                    />
                  </div>
                  <div className="mb-2 col-md-12">
                    <label className="mb-2">First name</label>

                    <input
                      className="form-control"
                      value={formData.firstName}
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      onChange={handleFirstNameChange}
                    />
                  </div>
                  <div className="mb-2 col-md-12">
                    <label className="mb-2">Last name</label>

                    <input
                      className="form-control"
                      value={formData.lastName}
                      id="inputLastName"
                      type="text"
                      placeholder="Enter your last name"
                      onChange={handleLastNameChange}
                    />
                  </div>
                  <div className="mb-2 col-md-12">
                    <label className="mb-2">Phone number</label>

                    <PhoneInput
                      className="phone-input"
                      country={"id"}
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onlyCountries={[
                        "id",
                        "us",
                        "cn",
                        "jp",
                        "sg",
                        "au",
                        "sa",
                        "kr",
                        "gb",
                      ]}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e })
                      }
                    />
                  </div>

                  <div className="mb-2 col-md-12">
                    <label className="mb-2">Birth date</label>
                    <div className="icon">
                      <ReactDatePicker
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
                  </div>
                  <div className="mb-2 col-md-12">
                    <label className="mb-2">Gender</label>
                    <div>
                      <fieldset>
                        <input
                          type="radio"
                          id="male"
                          value="MALE"
                          name="gender"
                          checked={formData.gender === "MALE"}
                          style={{ marginRight: 5 }}
                          onChange={handleGenderChange}
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
                          onChange={handleGenderChange}
                        ></input>
                        <label htmlFor="female" style={{ marginLeft: 5 }}>
                          Female
                        </label>
                      </fieldset>
                    </div>
                  </div>
                  <div className="mb-2 col-md-12">
                    <label className="mb-2">Address</label>

                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Enter your address"
                      value={formData.address}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="mb-2 col-md-12">
                    <label className="small mb-2" htmlFor="inputImage">
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      id="inputImage"
                      onChange={handleImageChange}
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <div className="container-xl px-4 mt-4">
    //   <h1 className="display-6 fw-bold text-green">Edit profile</h1>
    //   <hr className="mt-0 mb-4" />
    //   <div className="row">
    //     {/* ... */}
    //     <div className="col-xl-8">
    //       <div className="card mb-4">
    //         <div className="card-header">Account Details</div>
    //         <div className="card-body">
    //           <form>
    //             <div className="mb-3">
    //               <label className="small mb-1" htmlFor="inputFirstName">
    //                 First Name
    //               </label>
    //               <input
    //                 className="form-control"
    //                 value={formData.firstName}
    //                 id="inputFirstName"
    //                 type="text"
    //                 placeholder="Enter your first name"
    //                 onChange={handleFirstNameChange}
    //               />
    //             </div>

    //             <div className="mb-3">
    //               <label className="small mb-1" htmlFor="inputLastName">
    //                 Last Name
    //               </label>
    //               <input
    //                 className="form-control"
    //                 value={formData.lastName}
    //                 id="inputLastName"
    //                 type="text"
    //                 placeholder="Enter your last name"
    //                 onChange={handleLastNameChange}
    //               />
    //             </div>

    //             <div className="mb-3">
    //               <label className="small mb-1" htmlFor="inputPhoneNumber">
    //                 Phone Number
    //               </label>
    //               <input
    //                 className="form-control"
    //                 value={formData.phoneNumber}
    //                 id="inputPhoneNumber"
    //                 type="text"
    //                 placeholder="Enter your phone number"
    //                 onChange={handlePhoneNumberChange}
    //               />
    //             </div>

    //             <div className="mb-3">
    //               <label className="small mb-1" htmlFor="inputBirthDate">
    //                 Birth Date
    //               </label>
    //               <input
    //                 className="form-control"
    //                 value={formData.birthDate}
    //                 id="inputBirthDate"
    //                 type="text"
    //                 placeholder="Enter your birth date"
    //                 onChange={handleBirthDateChange}
    //               />
    //             </div>

    //             <div className="mb-3">
    //               <label className="small mb-1" htmlFor="inputGender">
    //                 Gender
    //               </label>
    //               <input
    //                 className="form-control"
    //                 value={formData.gender}
    //                 id="inputGender"
    //                 type="text"
    //                 placeholder="Enter your gender"
    //                 onChange={handleGenderChange}
    //               />
    //             </div>

    //             <div className="mb-3">
    //               <label className="small mb-1" htmlFor="inputAddress">
    //                 Address
    //               </label>
    //               <input
    //                 className="form-control"
    //                 value={formData.address}
    //                 id="inputAddress"
    //                 type="text"
    //                 placeholder="Enter your address"
    //                 onChange={handleAddressChange}
    //               />
    //             </div>

    //             <div className="mb-3">
    //               <label className="small mb-1" htmlFor="inputEmail">
    //                 Email
    //               </label>
    //               <input
    //                 className="form-control"
    //                 value={formData.userCredential?.email || ""}
    //                 id="inputEmail"
    //                 type="text"
    //                 placeholder="Enter your email address"
    //                 onChange={handleEmailChange}
    //                 readOnly
    //               />
    //             </div>

    //             <div className="mb-3">
    //               <label className="small mb-1" htmlFor="inputImage">
    //                 Image
    //               </label>
    //               <input
    //                 type="file"
    //                 className="form-control"
    //                 accept="image/*"
    //                 id="inputImage"
    //                 onChange={handleImageChange}
    //               />
    //             </div>

    // <button
    //   className="btn btn-primary"
    //   type="button"
    //   onClick={handleSubmit}
    // >
    //   Save changes
    // </button>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default EditProfile;
