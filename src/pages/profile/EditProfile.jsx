// import React, { useEffect, useState } from "react";
// import { DatePicker } from "antd";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { selectUser } from "../../components/redux/UserSlice";
// import { BASE_CUSTOMER } from "../../constant/Endpoint";

// function EditProfile() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     birthDate: "",
//     gender: "",
//     userCredential: {
//       email: "",
//     },
//     password: "",
//     address: "",
//     image: "",
//   });

//   const user = useSelector(selectUser);
//   console.log(user.customerId);

//   const customerId = user.customerId;

//   console.log("ini id : " + user.customerId);

//   // const [valid, setValid] = useState("");

//   const [errors, setErrors] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     address: "",
//     email: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${BASE_CUSTOMER}/${customerId}`)
//       .then((response) => {
//         const userData = response.data.data;
//         setFormData(userData);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [customerId]);

//   const handleFirstNameChange = (e) => {
//     setFormData({ ...formData, firstName: e.target.value });
//   };

//   const handleLastNameChange = (e) => {
//     setFormData({ ...formData, lastName: e.target.value });
//   };

//   const handlePhoneNumberChange = (e) => {
//     setFormData({ ...formData, phoneNumber: e.target.value });
//   };

//   const handleAddressChange = (e) => {
//     setFormData({ ...formData, address: e.target.value });
//   };

//   const handleEmailChange = (e) => {
//     setFormData({
//       ...formData,
//       userCredential: {
//         ...formData.userCredential,
//         email: e.target.value,
//       },
//     });
//   };

//   // setFormData({ ...formData, [customerId]: value });

//   console.log(formData, "ini form data");

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const isFormValid = validateForm();

//   //   if (isFormValid) {
//   //     try {
//   //       const response = await axios.put(`${BASE_CUSTOMER}`, {
//   //         id: customerId,
//   //         firstName: formData.firstName,
//   //         lastName: formData.lastName,
//   //         phoneNumber: formData.phoneNumber,
//   //         address: formData.address,
//   //         email: formData.userCredential.email,
//   //         image: formData.image,
//   //       });

//   //       // Check if the update was successful
//   //       if (response.status === 200) {
//   //         console.log("sukses ubah");
//   //         navigate("/profile");
//   //       } else {
//   //         // Handle unsuccessful response (e.g., display an error message)
//   //         console.error("Update failed:", response.data);
//   //         let validationErrors = {};
//   //         validationErrors.general = "Update failed. Please try again.";
//   //         setErrors(validationErrors);
//   //       }
//   //     } catch (error) {
//   //       // Handle Axios or validation error
//   //       console.error("Error during update:", error);

//   //       // Customize the error handling based on your needs
//   //       let validationErrors = {};
//   //       validationErrors.general = "Update failed. Please try again.";
//   //       setErrors(validationErrors);
//   //     }
//   //   }
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const response = await axios.put(`${BASE_CUSTOMER}`, {
//   //       id: customerId,
//   //       firstName: formData.firstName,
//   //       lastName: formData.lastName,
//   //       phoneNumber: formData.phoneNumber,
//   //       address: formData.address,
//   //       email: formData.userCredential.email,
//   //       // image: formData.image,
//   //     });

//   //     // Check if the update was successful
//   //     if (response.status === 200) {
//   //       console.log("sukses ubah");
//   //       navigate("/profile");
//   //     } else {
//   //       // Handle unsuccessful response (e.g., display an error message)
//   //       console.error("Update failed:", response.data);
//   //     }
//   //   } catch (error) {
//   //     // Handle Axios or validation error
//   //     console.error("Error during update:", error);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.put(`${BASE_CUSTOMER}`, formData);

//       if (response.status === 200) {
//         console.log("Update successful");
//         navigate("/profile");
//       } else {
//         console.error("Update failed:", response.data);
//       }
//     } catch (error) {
//       console.error("Error during update:", error);
//     }
//   };

//   // const validateForm = () => {
//   //   const validationErrors = {
//   //     lastName: formData.lastName.trim() === "" ? "Full Name is required" : "",
//   //     firstName:
//   //       formData.firstName.trim() === "" ? "Full Name is required" : "",
//   //     phoneNumber: !/^\d+$/.test(formData.phoneNumber)
//   //       ? "Phone number must contain only numbers"
//   //       : "",
//   //     address: formData.address.trim() === "" ? "Address is required" : "",
//   //     email: !/^\S+@\S+\.\S+$/.test(formData.email)
//   //       ? "Please enter a valid email address"
//   //       : "",
//   //   };

//   //   // Validate username does not contain spaces
//   //   // if (formData.username.includes(" ")) {
//   //   //   validationErrors.username = "Username cannot contain spaces";
//   //   // }

//   //   // Set errors state with validationErrors object
//   //   setErrors(validationErrors);

//   //   // Check if all fields are valid
//   //   const isFormValid = Object.values(validationErrors).every(
//   //     (error) => error === ""
//   //   );

//   //   return isFormValid;
//   // };

//   console.log(customerId, "ini customer id");

//   return (
//     <div className="container-xl px-4 mt-4">
//       {/* Account page navigation*/}
//       <h1 className="display-6 fw-bold text-green">Edit profile</h1>
//       <hr className="mt-0 mb-4" />
//       <div className="row">
//         <div className="col-xl-4">
//           {/* Profile picture card*/}
//           <div className="card mb-4 mb-xl-0">
//             <div className="card-header">Profile Picture</div>
//             <div className="card-body text-center">
//               {/* Profile picture image*/}
//               <img
//                 className="img-account-profile rounded-circle mb-2"
//                 style={{ alignContent: "center", width: "300px" }}
//                 src="src/assets/images/Profile.png"
//                 alt=""
//               />
//               {/* Profile picture help block*/}
//               <div className="small font-italic text-muted mb-2">
//                 JPG or PNG no larger than 5 MB
//               </div>
//               {/* Profile picture upload button*/}
//               <input
//                 type="file"
//                 className="btn btn-primary"
//                 accept="image/*"

//                 // onChange={UploadImg}
//                 // ref={imageUploader}
//                 // onClick={() => imageUploader.current.click()}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="col-xl-8">
//           {/* Account details card*/}
//           <div className="card mb-4">
//             <div className="card-header">Account Details</div>
//             <div className="card-body">
//               <form>
//                 {/* Form Group (first name)*/}
//                 <div className="mb-3">
//                   <label className="small mb-1" htmlFor="inputFirstName">
//                     First Name
//                   </label>
//                   <input
//                     className="form-control"
//                     value={formData.firstName}
//                     id="inputFirstName"
//                     type="text"
//                     placeholder="Enter your first name"
//                     onChange={handleFirstNameChange}
//                   />
//                 </div>
//                 {/* Form Group (last name)*/}
//                 <div className="mb-3">
//                   <label className="small mb-1" htmlFor="inputLastName">
//                     Last Name
//                   </label>
//                   <input
//                     className="form-control"
//                     value={formData.lastName}
//                     id="inputLastName"
//                     type="text"
//                     placeholder="Enter your last name"
//                     onChange={handleLastNameChange}
//                   />
//                 </div>

//                 {/* Form Group (Phone)*/}
//                 <div className="mb-3">
//                   <label className="small mb-1" htmlFor="inputPhoneNumber">
//                     Phone Number
//                   </label>
//                   <input
//                     className="form-control"
//                     value={formData.phoneNumber}
//                     id="inputPhoneNumber"
//                     type="text"
//                     placeholder="Enter your phone number"
//                     onChange={handlePhoneNumberChange}
//                   />
//                 </div>

//                 {/* Form Group (address)*/}
//                 <div className="mb-3">
//                   <label className="small mb-1" htmlFor="inputAddress">
//                     Address
//                   </label>
//                   <input
//                     className="form-control"
//                     value={formData.address}
//                     id="inputAddress"
//                     type="text"
//                     placeholder="Enter your address ex: Bekasi City"
//                     onChange={handleAddressChange}
//                   />
//                 </div>

//                 {/* Form Group (email)*/}
//                 <div className="mb-3">
//                   <label className="small mb-1" htmlFor="inputEmail">
//                     Email
//                   </label>
//                   <input
//                     className="form-control"
//                     value={formData.userCredential?.email || ""}
//                     id="inputEmail"
//                     type="text"
//                     placeholder="Enter your email address ex: name@gmail.com"
//                     onChange={handleEmailChange}
//                   />
//                 </div>

//                 {/* Save changes button*/}
//                 <button
//                   className="btn btn-primary"
//                   type="button"
//                   onClick={handleSubmit}
//                 >
//                   Save changes
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../components/redux/UserSlice";
import { BASE_CUSTOMER } from "../../constant/Endpoint";

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

  const handlePhoneNumberChange = (e) => {
    setFormData({ ...formData, phoneNumber: e.target.value });
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
    <div className="container-xl px-4 mt-4">
      <h1 className="display-6 fw-bold text-green">Edit profile</h1>
      <hr className="mt-0 mb-4" />
      <div className="row">
        {/* ... */}
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputFirstName">
                    First Name
                  </label>
                  <input
                    className="form-control"
                    value={formData.firstName}
                    id="inputFirstName"
                    type="text"
                    placeholder="Enter your first name"
                    onChange={handleFirstNameChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputLastName">
                    Last Name
                  </label>
                  <input
                    className="form-control"
                    value={formData.lastName}
                    id="inputLastName"
                    type="text"
                    placeholder="Enter your last name"
                    onChange={handleLastNameChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputPhoneNumber">
                    Phone Number
                  </label>
                  <input
                    className="form-control"
                    value={formData.phoneNumber}
                    id="inputPhoneNumber"
                    type="text"
                    placeholder="Enter your phone number"
                    onChange={handlePhoneNumberChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputBirthDate">
                    Birth Date
                  </label>
                  <input
                    className="form-control"
                    value={formData.birthDate}
                    id="inputBirthDate"
                    type="text"
                    placeholder="Enter your birth date"
                    onChange={handleBirthDateChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputGender">
                    Gender
                  </label>
                  <input
                    className="form-control"
                    value={formData.gender}
                    id="inputGender"
                    type="text"
                    placeholder="Enter your gender"
                    onChange={handleGenderChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputAddress">
                    Address
                  </label>
                  <input
                    className="form-control"
                    value={formData.address}
                    id="inputAddress"
                    type="text"
                    placeholder="Enter your address"
                    onChange={handleAddressChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmail">
                    Email
                  </label>
                  <input
                    className="form-control"
                    value={formData.userCredential?.email || ""}
                    id="inputEmail"
                    type="text"
                    placeholder="Enter your email address"
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputImage">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
